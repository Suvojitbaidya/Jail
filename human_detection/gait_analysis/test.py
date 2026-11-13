import os
import cv2
from emailHelper import send_email_alert
import torch
import numpy as np
from torchvision import transforms
from ultralytics import YOLO
from PIL import Image
from datetime import datetime, timedelta
from gait_analysis.model import GaitResNet

# Setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = GaitResNet()
model.load_state_dict(torch.load("gait_analysis/gait_resnet_triplet.pth", map_location=device))
model.to(device).eval()

data = np.load("gait_analysis/known_gait_embeddings.npz", allow_pickle=True)
known_embeddings = data["embeddings"]
known_labels = data["labels"]

yolo = YOLO("yolov8n.pt")

tf = transforms.Compose([
    transforms.Resize((112, 56)),
    transforms.ToTensor(),
])

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def process_frame(image_bgr, target_name, threshold=0.95):
    results = yolo(image_bgr, verbose=False)[0]
    for det in results.boxes:
        if int(det.cls.item()) != 0:
            continue
        x1, y1, x2, y2 = map(int, det.xyxy[0])
        crop = image_bgr[y1:y2, x1:x2]
        crop_rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(crop_rgb)
        input_tensor = tf(pil_img).unsqueeze(0).to(device)

        with torch.no_grad():
            emb = model(input_tensor).cpu().numpy()[0]

        sims = [cosine_similarity(emb, e) for e in known_embeddings]
        max_sim = max(sims) if sims else 0
        best_idx = np.argmax(sims) if sims else -1
        label = known_labels[best_idx] if max_sim > threshold else "Unknown"

        if label == target_name:
            today = datetime.now().strftime("%Y-%m-%d")
            os.makedirs(os.path.join("gait_analysis/Processed", today), exist_ok=True)
            filename = f"IMG_{datetime.now().strftime('%d%m%Y_%H%M%S')}.jpg"
            output_path = os.path.join("gait_analysis/Processed", today, filename)

            cv2.rectangle(image_bgr, (x1, y1), (x2, y2), (0, 255, 0), 3)
            # Parameters
            font = cv2.FONT_HERSHEY_SIMPLEX
            font_scale = 1.2
            thickness = 3
            text = target_name
            text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)
            text_width, text_height = text_size
            
            # Position
            x, y = x1, y1 - 10
            
            # Draw white rectangle background
            cv2.rectangle(image_bgr, (x, y - text_height - 5), (x + text_width + 5, y + 5), (255, 255, 255), -1)
            
            # Draw red text on top
            cv2.putText(image_bgr, text, (x, y), font, font_scale, (0, 0, 255), thickness)
            cv2.imwrite(output_path, image_bgr)

            return True, filename,output_path
    return False, None,None

def process_video(video_path, target_name, base_time_str, threshold=0.95):
    """
    Returns:
        dict: {
            "success": True/False,
            "timestamp_sec": str (HH:MM:SS) or None,
            "filename": str or None,
            "message": str
        }
    """
    try:
        base_time = datetime.strptime(base_time_str, "%H:%M:%S")
    except Exception as e:
        print(f"Invalid base_time_str: {e}")
        base_time = datetime.strptime("00:00:00", "%H:%M:%S")

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {
            "success": False,
            "timestamp_sec": None,
            "url": None,
            "message": "Failed to open video."
        }

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_index = 0

    while frame_index < total_frames:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_index % fps == 0:
            seconds_passed = frame_index // fps
            found, filename,output_path = process_frame(frame, target_name, threshold)
            if found:
                cap.release()
                detection_time = base_time + timedelta(seconds=seconds_passed)
                detection_time_str = detection_time.strftime("%H:%M:%S")
                subject = f"ALERT: {target_name} is found on Camera 1"
                body = (
                f"ALERT: {target_name} is found on Camera 1 at {detection_time_str}\n"
                "Please review the footage for more details."
            )
                full_path = f"{output_path}/{filename}"
                camera_name = "Camera 1"
                human_count =1
                send_email_alert( camera_name, human_count ,output_path, subject, body)
                return {
                    "success": True,
                    "timestamp_sec": detection_time_str,
                    "url": filename,
                    "message": "Person found",
                    "camera_name":"Camera 1"
                }

        frame_index += fps

    cap.release()
    return {
        "success": False,
        "timestamp_sec": None,
        "url": None,
        "message": "Person not found in video"
    }
