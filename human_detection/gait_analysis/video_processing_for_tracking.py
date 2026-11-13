import os
import cv2
import sys
import torch
import numpy as np
from PIL import Image
from datetime import datetime, timedelta
from facenet_pytorch import InceptionResnetV1, MTCNN
from ultralytics import YOLO
import multiprocessing as mp
import contextlib
import logging

logging.getLogger('ultralytics').setLevel(logging.ERROR)

@contextlib.contextmanager
def suppress_output():
    with open(os.devnull, "w") as devnull:
        old_stdout, old_stderr = sys.stdout, sys.stderr
        sys.stdout, sys.stderr = devnull, devnull
        try:
            yield
        finally:
            sys.stdout, sys.stderr = old_stdout, old_stderr

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# models
resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)
mtcnn = MTCNN(image_size=160, device=device)
yolo = YOLO("yolov8x.pt")

# load known faces
data = np.load("gait_analysis/known_face_embeddings.npz", allow_pickle=True)
known_embeddings, known_labels = data["embeddings"], data["labels"]

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def parse_video_time(filename):
    """Extract time from HH_MM_SS.mp4"""
    base = os.path.splitext(filename)[0]
    return datetime.strptime(base, "%H_%M_%S").time()

def get_camera_videos(base_dir, start_dt, end_dt):
    """Collect all camera videos that overlap with [start_dt, end_dt], across dates."""
    camera_videos = {}

    # cover both start date and end date (if different)
    for date_dt in [start_dt.date(), end_dt.date()]:
        date_str = date_dt.strftime("%Y-%m-%d")
        date_dir = os.path.join(base_dir, date_str)
        if not os.path.exists(date_dir):
            continue

        for cam_name in os.listdir(date_dir):
            cam_path = os.path.join(date_dir, cam_name)
            if not os.path.isdir(cam_path):
                continue

            for vf in sorted(os.listdir(cam_path)):
                if not vf.endswith(".mp4"):
                    continue

                try:
                    vid_time = parse_video_time(vf)
                    vid_dt = datetime.combine(date_dt, vid_time)
                except Exception:
                    continue

                if start_dt <= vid_dt <= end_dt:
                    camera_videos.setdefault(cam_name, []).append(os.path.join(cam_path, vf))

    return camera_videos

def process_frame(frame, target_name, threshold=0.80):
    """Check if target face is inside this frame and annotate with label if found."""
    with suppress_output():
        results = yolo(frame)[0]

    for det in results.boxes:
        if int(det.cls.item()) != 0:  # class 0 = person
            continue

        x1, y1, x2, y2 = map(int, det.xyxy[0])
        if x2 - x1 < 30 or y2 - y1 < 30:
            continue

        crop = frame[y1:y2, x1:x2]
        if crop.size == 0:
            continue

        try:
            face = mtcnn(Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)))
            if face is None:
                continue
        except Exception:
            continue

        with torch.no_grad():
            emb = resnet(face.unsqueeze(0).to(device)).cpu().numpy()[0]

        sims = [cosine_similarity(emb, e) for e in known_embeddings]
        max_sim = max(sims)
        best_idx = np.argmax(sims)
        label = known_labels[best_idx] if max_sim > threshold else "Unknown"

        if label == target_name:
            # ✅ Draw bounding box + label on the frame
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame,
                f"{label} ({max_sim:.2f})",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

            # ✅ Save annotated frame
            today = datetime.now().strftime("%Y-%m-%d")
            os.makedirs(os.path.join("gait_analysis/Processed", today), exist_ok=True)
            filename = f"{target_name}_{datetime.now().strftime('%d%m%Y_%H%M%S')}.jpg"
            output_path = os.path.join("gait_analysis/Processed", today, filename)
            cv2.imwrite(output_path, frame)

            return True, filename

    return False, None


def process_video_task(args):
    """Process one camera's videos until target is found or end of time window."""
    cam_name, video_paths, target_name, threshold, start_dt, end_dt = args

    for video_path in video_paths:
        try:
            video_start_time = parse_video_time(os.path.basename(video_path))
            video_start_dt = datetime.combine(start_dt.date(), video_start_time)

            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                continue

            fps = cap.get(cv2.CAP_PROP_FPS) or 25
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            duration = frame_count / fps
            video_end_dt = video_start_dt + timedelta(seconds=duration)

            # skip if video outside search window
            if video_end_dt < start_dt or video_start_dt > end_dt:
                cap.release()
                continue

            frame_num = int(cap.get(cv2.CAP_PROP_POS_FRAMES))
            step = int(fps)  # 1 frame/sec

            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                current_time = video_start_dt + timedelta(seconds=(frame_num / fps))
                if current_time > end_dt:
                    break

                if frame_num % step == 0:
                    found, filename = process_frame(frame, target_name, threshold)
                    if found:
                        cap.release()
                        return [{
                            "camera": cam_name,
                            "time": current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
                            "filename": filename
                        }]

                frame_num += 1

            cap.release()

        except Exception as e:
            print(f"⚠️ Error processing {video_path}: {e}")
            continue

    return []  # nothing found

def run_detection_from_server(base_dir, start_dt_str, end_dt_str, target_name):
    start_dt = datetime.fromisoformat(start_dt_str)
    end_dt = datetime.fromisoformat(end_dt_str)

    # handle cross-midnight
    if end_dt < start_dt:
        end_dt += timedelta(days=1)

    camera_videos = get_camera_videos(base_dir, start_dt, end_dt)

    args_list = [
        (cam, paths, target_name, 0.80, start_dt, end_dt)
        for cam, paths in camera_videos.items()
    ]

    print("\n🔍 Detecting in parallel...\n")
    results = []
    with mp.Pool(processes=min(len(args_list), mp.cpu_count())) as pool:
        detections_list = pool.map(process_video_task, args_list)
        for detections in detections_list:
            if detections:
                results.extend(detections)

    return {
        "target": target_name,
        "success": len(results) > 0,
        "message": "Detection completed successfully." if results else "No detections found.",
        "result": sorted(results, key=lambda x: x['time'])
    }
