import cv2
import os
from ultralytics import YOLO
import numpy as np
from datetime import datetime
import os
import sys

# Get the current script's directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Get the parent directory
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to sys.path
sys.path.append(parent_dir)

# Now you can import the function
from db_connection import log_to_database
from emailHelper import send_email_alert
# Load YOLOv8 model (automatically downloads the model if not present)
model = YOLO('height_calculation/yolov8n.pt')  # You can use 'yolov8s.pt' for better accuracy


    
# input_height = 7  # Input height from user
# height_ft = input_height - 3.5  # Adjust height for your scale



def process_image(id,image_path, input_height, camera_name ):

    height_in_feet= input_height - 2

    MARKED_FOLDER = "height_calculation/Processed"   # Folder to save processed images
    # Make sure the output folder exists
    os.makedirs(MARKED_FOLDER, exist_ok=True)

    # Save the image with height calulation in the specific date folder
    current_date = str(datetime.now().strftime("%Y-%m-%d"))
    date_folder = os.path.join(MARKED_FOLDER,current_date)
    os.makedirs(date_folder, exist_ok=True)

    
    
    image = cv2.imread(image_path)
    if image is None:
        print(f"Could not read {image_path}")
        return None

    height_pixels = int(image.shape[0] - (height_in_feet / 6.0 * image.shape[0]))  # approx scale
    line_y = max(0, min(image.shape[0], height_pixels))

    results = model(image)[0]
    found = False
    count =0
    for box in results.boxes:
        cls = int(box.cls[0])
        if model.names[cls] == 'person':
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            person_top = y1
            if person_top < line_y:
                found = True
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(image, "Above Line", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                count+=1

    cv2.line(image, (0, line_y), (image.shape[1], line_y), (0, 0, 255), 2)
    os.makedirs(date_folder, exist_ok=True)
    output_path = os.path.join(date_folder, os.path.basename(image_path))
    if found:
        cv2.imwrite(output_path, image)
        current_time =datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        log_to_database(id, "HEIGHT", os.path.basename(image_path), count)

        subject = f"ALERT: Height Threshold Breach on Camera {camera_name}"
        body = (
        f"ALERT: A person exceeding the height threshold was detected on camera '{camera_name}' at {current_time}.\n"
        f"Number of People Detected: {count}\n"
        "Please review the footage for more details."
    )
        send_email_alert(camera_name, count, output_path, subject, body)
        print(f"[✓] {count} Person above line in: {output_path} on {camera_name} at {current_time}")
        return output_path
    else:
        print(f"[x] No person above line in: {image_path}")
        return None

