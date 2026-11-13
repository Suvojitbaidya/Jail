import os
import math
import cv2
from ultralytics import YOLO
from datetime import datetime
from db_connection import log_to_database
from emailHelper import send_email_alert
# ================= CONFIG =================

OUTPUT_FOLDER = "pose_estimation/Processed"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Save image & send alert if threshold crossed
current_date = datetime.now().strftime("%Y-%m-%d")
FRAME_FOLDER = os.path.join(OUTPUT_FOLDER, current_date)
os.makedirs(FRAME_FOLDER, exist_ok=True)
# ===========================================

# Load YOLOv8 pose model once (global for speed)



def valid_idx(kp_xy, kp_conf, idx, min_conf=0.3):
    """Check if a keypoint is valid and above confidence threshold."""
    return idx < len(kp_conf) and kp_conf[idx] >= min_conf and kp_xy[idx] is not None


def detect_bending_in_frame(img_path, camera_name, camera_id):
    MIN_KP_CONF = 0.35
    BEND_ANGLE_THRESHOLD = 25  # degrees

    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Image not found: {img_path}")

    frame = cv2.imread(img_path)
    if frame is None:
        raise ValueError(f"Unable to read image: {img_path}")
    
    # load model once outside in global scope if possible for speed
    model = YOLO("yolov8m-pose.pt")
    results = model(frame, verbose=False)

    human_count = 0  # bending humans counter

    for r in results:
        if r.keypoints is None or r.keypoints.xy is None or r.keypoints.conf is None:
            continue

        kp_all = r.keypoints.xy.cpu().numpy()
        kc_all = r.keypoints.conf.cpu().numpy()
        boxes = r.boxes.xyxy.cpu().numpy()

        for i, box in enumerate(boxes):

            if int(r.boxes.cls[i]) != 0:  # only process person class
                continue
            if kp_all[i] is None or kc_all[i] is None:
                continue

            kp_xy = [
                (float(kp_all[i][j][0]), float(kp_all[i][j][1])) if kc_all[i][j] >= MIN_KP_CONF else None
                for j in range(len(kp_all[i]))
            ]
            kp_conf = [float(kc_all[i][j]) for j in range(len(kc_all[i]))]

            nose = kp_xy[0] if valid_idx(kp_xy, kp_conf, 0, MIN_KP_CONF) else None
            left_ankle = kp_xy[15] if valid_idx(kp_xy, kp_conf, 15, MIN_KP_CONF) else None
            right_ankle = kp_xy[16] if valid_idx(kp_xy, kp_conf, 16, MIN_KP_CONF) else None

            if nose is None or (left_ankle is None and right_ankle is None):
                continue

            if left_ankle and right_ankle:
                ankle_mid = ((left_ankle[0] + right_ankle[0]) / 2,
                             (left_ankle[1] + right_ankle[1]) / 2)
            else:
                ankle_mid = left_ankle if left_ankle else right_ankle

            dx = nose[0] - ankle_mid[0]
            dy = ankle_mid[1] - nose[1]
            angle = abs(math.degrees(math.atan2(dx, dy)))

            if angle > BEND_ANGLE_THRESHOLD:
                human_count += 1

                # Draw bounding box
                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)

                # Annotate text
                cv2.putText(frame, f"Bending ({angle:.1f}°)", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)



    if human_count > 0:
        current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
        marked_image_name = f"{camera_name}_{current_time}.jpg"
        marked_image_path = os.path.join(FRAME_FOLDER, marked_image_name)

        cv2.imwrite(marked_image_path, frame)

        log_to_database(camera_id, "BENDING", marked_image_name, human_count)
        print(f"[ALERT] {human_count} bending human(s) detected from {camera_name} (ID: {camera_id}) → saved {FRAME_FOLDER}")
        return True, human_count

    return False, 0
