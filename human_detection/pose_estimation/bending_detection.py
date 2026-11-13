
import os   
import cv2
import numpy as np
from datetime import datetime
from ultralytics import YOLO
from db_connection import log_to_database
from emailHelper import send_email_alert

def is_valid(pt):
    return not (pt[0] == 0 and pt[1] == 0)

def vec_angle(a, b):
    cos_theta = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-6)
    return np.degrees(np.arccos(np.clip(cos_theta, -1.0, 1.0)))

MARKED_FOLDER="pose_estimation/Processed"
os.makedirs(MARKED_FOLDER, exist_ok=True)



def detect_bending_in_frame(image_path, camera_name, camera_id):
    model = YOLO("yolov8m-pose.pt")
    model.fuse()

    img = cv2.imread(image_path)
    if img is None:
        print(f"[!] Failed to read: {image_path}")
        return

    res = model.predict(img, conf=0.25, verbose=False)[0]
    if not hasattr(res, 'keypoints') or res.keypoints is None:
        # print("[!] No keypoints detected.")
        return

    kp_list = res.keypoints.xy
    boxes = res.boxes.xyxy.cpu().numpy().astype(int)
    annotated = img.copy()
    bend_count = 0

    for idx in range(len(kp_list)):
        kp = kp_list[idx].cpu().numpy()
        if len(kp) < 15 or len(boxes) <= idx:
            continue
        
        # Prefer right side; fallback to left
        if is_valid(kp[6]) and is_valid(kp[12]) and is_valid(kp[14]):
            shoulder, hip, knee = kp[6], kp[12], kp[14]
        elif is_valid(kp[5]) and is_valid(kp[11]) and is_valid(kp[13]):
            shoulder, hip, knee = kp[5], kp[11], kp[13]
        else:
            continue

        torso_vec = hip - shoulder
        leg_vec = knee - hip
        angle = vec_angle(torso_vec, leg_vec)

        # print(f"[Debug] Person {idx+1} - Torso-to-Leg angle: {int(angle)}°")

        x1, y1, x2, y2 = boxes[idx]

        if 40 <= angle <= 160:
            color = (0, 255, 0)  # Green box for bending
            cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
            cv2.putText(annotated, f"BEND {int(angle)} deg", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            bend_count += 1

    if bend_count > 0:


    # Save the image with human detections in the specific camera folder
        current_date = str(datetime.now().strftime("%Y-%m-%d"))
        date_folder = os.path.join(MARKED_FOLDER,current_date)
        os.makedirs(date_folder, exist_ok=True)

     # Save the marked image
        current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
        marked_image_name = f"{camera_name}_{current_time}.jpg"
        marked_image_path = os.path.join(date_folder, marked_image_name)
        cv2.imwrite(marked_image_path, annotated)

        # os.makedirs(output_dir, exist_ok=True)
        # timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        # filename = f"{camera_name}_{timestamp}.jpg"
        # save_path = os.path.join(output_dir, filename)
        # cv2.imwrite(save_path, annotated)

        # Log to DB
        log_to_database(camera_id, "BENDING", marked_image_name, bend_count)

        # Send email alert
        subject = f"ALERT: Bending detected on {camera_name}"
        body = f"Bending detected on camera '{camera_name}' at {current_time}.\nNumber of People Bending: {bend_count}\nPlease review the attached image."
        send_email_alert(camera_name, bend_count, marked_image_path, subject, body)

    else:
        # print("[ℹ] No bending over detected.")
        pass