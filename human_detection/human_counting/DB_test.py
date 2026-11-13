import cv2
import numpy as np
import os
from datetime import datetime
from ultralytics import YOLO
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)
from db_connection import log_to_database
from emailHelper import send_email_alert





# Load YOLO
net = cv2.dnn.readNet("human_counting/yolov3.weights", "human_counting/yolov3.cfg")  # Make sure to replace the file paths if needed
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

# Load class labels for YOLO (from coco.names)
with open("human_counting/coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]




# Define the folder where captured frames will be saved
MARKED_FOLDER = "human_counting/Processed"  # Folder for marked images
LOG_FILE = os.path.join(MARKED_FOLDER, "log.txt")  # Log file for marked images

os.makedirs(MARKED_FOLDER, exist_ok=True)

# Initialize serial number for logging
serial_no = 1

# Database logging function

#IoU Function
def compute_iou(box1, box2):
    # box = [x, y, w, h]
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


# Load your trained YOLOv8 khaki model
khaki_model = YOLO('human_counting/best.pt')


#Implement khaki Detection Function
def detect_khaki_boxes_yolov8(image):
    """
    Runs YOLOv8 khaki model and returns list of [x, y, w, h] boxes
    """
    results = khaki_model.predict(source=image, verbose=False)

    khaki_boxes = []
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            w = x2 - x1
            h = y2 - y1
            khaki_boxes.append([int(x1), int(y1), int(w), int(h)])

    return khaki_boxes



# Function to detect and mark humans in the frame
def detect_and_mark_humans(id,image, camera_name,EMAIL_SEND_THERESOLD):
    global serial_no
    height, width, channels = image.shape
    blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids = []
    confidences = []
    boxes = []

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if confidence > 0.5 and class_id == 0:  # "person"
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    # Step 2: Detect khaki (police) using YOLOv8
    khaki_boxes = detect_khaki_boxes_yolov8(image)  # Replace with actual YOLOv8 detection

    human_count = 0
    if len(indexes) > 0:
        for i in indexes.flatten():
            if class_ids[i] == 0:
                human_box = boxes[i]

                # Check if this human overlaps with any khaki box
                is_khaki = any(compute_iou(human_box, khaki_box) > 0.5 for khaki_box in khaki_boxes)

                if not is_khaki:
                    human_count += 1
                    x, y, w, h = human_box
                    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    label = f"Human {human_count}"
                    cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    print(f"\nNon-khaki humans detected: {human_count}")

    # Save the image with human detections in the specific camera folder
    current_date = str(datetime.now().strftime("%Y-%m-%d"))
    date_folder = os.path.join(MARKED_FOLDER,current_date)
    os.makedirs(date_folder, exist_ok=True)

    # Save the marked image
    current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
    marked_image_name = f"{camera_name}_{current_time}.jpg"
    marked_image_path = os.path.join(date_folder, marked_image_name)
    cv2.imwrite(marked_image_path, image)

    # Email send
    if human_count> EMAIL_SEND_THERESOLD:
        log_to_database(id, "COUNT", marked_image_name, human_count)

        subject = f"ALERT: High Human Count Detected on Camera {camera_name}"
        body = (
        f"ALERT: An unusually high number of people were detected on camera '{camera_name}' at {current_time}.\n"
        f"Number of People Detected: {human_count}\n"
        "Please review the footage for more details."
    )
        send_email_alert(camera_name, human_count, marked_image_path, subject, body)


    # Log the information into the database
    # log_to_database(serial_no, camera_name, marked_image_name, human_count)

    # Increment serial number
    serial_no += 1

    return human_count, marked_image_path