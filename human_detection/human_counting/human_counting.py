import cv2
import numpy as np
import os
from datetime import datetime
from ultralytics import YOLO
import sys

# Project imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)
from db_connection import log_to_database
from emailHelper import send_email_alert

# Output folder setup
MARKED_FOLDER = "human_counting/Processed"
os.makedirs(MARKED_FOLDER, exist_ok=True)

serial_no = 1

# IoU function
def compute_iou(box1, box2):
    x1, y1, w1, h1 = box1
    x2, y2, w2, h2 = box2
    xi1 = max(x1, x2)
    yi1 = max(y1, y2)
    xi2 = min(x1 + w1, x2 + w2)
    yi2 = min(y1 + h1, y2 + h2)
    inter_area = max(0, xi2 - xi1) * max(0, yi2 - yi1)
    box1_area = w1 * h1
    box2_area = w2 * h2
    union_area = box1_area + box2_area - inter_area
    return inter_area / union_area if union_area > 0 else 0

# Load YOLOv8 models
human_model = YOLO("yolov8x.pt")  # Pretrained model for human detection
khaki_model = YOLO("human_counting/best.pt")  # Custom khaki detection

# Khaki detection
def detect_khaki_boxes(image):
    results = khaki_model.predict(source=image, verbose=False, stream=True)
    khaki_boxes = []
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            w = x2 - x1
            h = y2 - y1
            khaki_boxes.append([int(x1), int(y1), int(w), int(h)])
    return khaki_boxes

# Main human + khaki detection function
def detect_and_mark_humans(id, image, camera_name, EMAIL_SEND_THRESHOLD):
    global serial_no

    # Detect humans
    results = human_model.predict(source=image, verbose=False, stream=True)
    human_boxes = []
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            if conf > 0.5 and human_model.names[cls_id] == "person":
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                w = x2 - x1
                h = y2 - y1
                human_boxes.append([int(x1), int(y1), int(w), int(h)])

    # Detect khakis
    khaki_boxes = detect_khaki_boxes(image)

    human_count = 0
    for human_box in human_boxes:
        is_khaki = any(compute_iou(human_box, khaki_box) > 0.5 for khaki_box in khaki_boxes)
        if not is_khaki:
            human_count += 1
            x, y, w, h = human_box
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            label = f"Human {human_count}"
            cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Save image & send alert if threshold crossed
    current_date = datetime.now().strftime("%Y-%m-%d")
    date_folder = os.path.join(MARKED_FOLDER, current_date)
    os.makedirs(date_folder, exist_ok=True)

    current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
    marked_image_name = f"{camera_name}_{current_time}.jpg"
    marked_image_path = os.path.join(date_folder, marked_image_name)

    if human_count > EMAIL_SEND_THRESHOLD:
        print(f"ALERT: {human_count} human(s) detected on camera {camera_name} at {current_time}.")
        cv2.imwrite(marked_image_path, image)
        log_to_database(id, "COUNT", marked_image_name, human_count)
        subject = f"ALERT: Human Count Detected on Camera {camera_name}"
        body = (
            f"ALERT: {human_count} people detected on camera '{camera_name}' at {current_time}.\n"
            "Please review the footage for more details."
        )
        send_email_alert(camera_name, human_count, marked_image_path, subject, body)

    serial_no += 1
    return human_count, marked_image_path
