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
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        sys.stdout = devnull
        sys.stderr = devnull
        try:
            yield
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# print("\U0001F680 Using device:", device)

resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)
mtcnn = MTCNN(image_size=160, device=device)
yolo = YOLO("yolov8x.pt")

data = np.load("gait_analysis/known_face_embeddings.npz", allow_pickle=True)
known_embeddings = data["embeddings"]
known_labels = data["labels"]

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def process_frame(frame, target_name, threshold=0.80):
    with suppress_output():
        results = yolo(frame)[0]

    for det in results.boxes:
        if int(det.cls.item()) != 0:
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
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
            label_text = f"{label} ({max_sim:.2f})"
            (tw, th), baseline = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
            cv2.rectangle(frame, (x1, y1 - th - 10), (x1 + tw + 10, y1), (0, 0, 255), -1)
            cv2.putText(frame, label_text, (x1 + 5, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)


            today = datetime.now().strftime("%Y-%m-%d")
            os.makedirs(os.path.join("gait_analysis/Processed", today), exist_ok=True)
            filename = f"{target_name}_{datetime.now().strftime('%d%m%Y_%H%M%S')}.jpg"
            output_path = os.path.join("gait_analysis/Processed", today, filename)
            # output_path = os.path.join("gait_analysis/Processed", today, filename)
            # os.makedirs("gait_analysis/output/detected_frames", exist_ok=True)
            # timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            # save_name = f"{label}_{timestamp}.jpg"
            # save_path = f"gait_analysis/output/detected_frames/{filename}"
            cv2.imwrite(output_path, frame)
            return True, filename

    return False, None

def process_video_task(args):
    cam_name, video_path, target_name, threshold, frame_limit_per_min, base_time_str = args
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return None

    fps = cap.get(cv2.CAP_PROP_FPS)
    skip = max(1, int((fps * 60) / frame_limit_per_min))
    frame_num = 0
    base_time = datetime.strptime(base_time_str, "%Y-%m-%d %H:%M:%S")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_num % skip == 0:
            found, filename = process_frame(frame, target_name, threshold)
            if found:
                detection_time = base_time + timedelta(seconds=(frame_num / fps))
                cap.release()
                return {
                    "camera": cam_name,
                    "time": detection_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
                    "filename": filename
                }

        frame_num += 1

    cap.release()
    return None

def run_detection_from_server(target_name, base_time_str, frame_limit_per_min=60):
    camera_videos = {
        "Camera 1": r"C:\Users\suman\Desktop\NOI\jail\human_detection\recordings\2025-08-21\Dahua-2\12_39_20.mp4",
        "Camera 2": r"C:\Users\suman\Desktop\NOI\jail\human_detection\recordings\2025-08-21\TP_link\12_39_23.mp4",
        "Camera 3": r"C:\Users\suman\Desktop\NOI\jail\human_detection\recordings\2025-08-21\Dahua-3\12_39_14.mp4",
        "Camera 4": r"C:\Users\suman\Desktop\NOI\jail\human_detection\recordings\2025-08-21\Dahua-1\12_39_12.mp4",
    }

    args_list = [
        (cam, path, target_name, 0.80, frame_limit_per_min, base_time_str)
        for cam, path in camera_videos.items()
    ]

    print("\n🔍 Detecting in parallel...\n")

    results = []
    try:
        with mp.Pool(processes=min(len(args_list), mp.cpu_count())) as pool:
            async_results = pool.map_async(process_video_task, args_list)
            detections = async_results.get(timeout=999999)
            for result in detections:
                if result:
                    results.append(result)
    except KeyboardInterrupt:
        print("\n🛑 Ctrl+C detected! Terminating processes...")
        pool.terminate()
        pool.join()
        sys.exit(0)

    # ✅ Return final JSON object
    return {
        "target": target_name,
        # "base_time": base_time_str,
        "success": len(results) > 0,
        "message": "Detection completed successfully." if results else "No detections found.",
        "result": sorted(results, key=lambda x: x['time'])
    }