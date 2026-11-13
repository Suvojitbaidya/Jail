# File: app.py

import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from io import BytesIO
from PIL import Image
import numpy as np

# Import from subfolders
from gait_analysis.test import process_video
from human_recognition.identification import identify_faces

# Background monitoring imports
from index import update_camera_list_periodically #,process_videos

# from gait_analysis.face_recognition import run_detection_from_server
import multiprocessing as mp

from recodingHelper import recoding 


from gait_analysis.video_processing_for_tracking import run_detection_from_server
app = Flask(__name__)
CORS(app)


# === Face Image Recognition Route ===
@app.route("/process_image", methods=["POST"])
def process_face_image():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"success": False, "message": "Empty filename"}), 400

    img = Image.open(BytesIO(file.read())).convert("RGB")
    np_img = np.array(img)

    results, annotated_img = identify_faces(np_img)
    if results is None:
        return jsonify({"success": False, "message": "No faces detected."})

    today = datetime.now().strftime("%Y-%m-%d")
    os.makedirs(os.path.join("human_recognition/Processed", today), exist_ok=True)
    filename = f"IMG_{datetime.now().strftime('%d%m%Y_%H%M%S')}.jpg"
    output_path = os.path.join("human_recognition/Processed", today, filename)
    annotated_img.save(output_path)

    return jsonify({"success": True, "faces": results, "url": filename})

# === Optional Home Route ===
@app.route('/')
def home():
    return "Flask is running with background monitoring!"



@app.route("/verify", methods=["POST"])
def detect_person_from_name():
    data = request.get_json()
    print(f"🎯 Received request: {data}")
    if not data or "name" not in data or "startDateTime" not in data or "endDateTime" not in data:
        return jsonify({"error": "Missing 'name' or 'startDateTime' or 'endDateTime' in request"}), 400

    target_name = data["name"].strip()
    start_time = data["startDateTime"].strip()
    end_time = data["endDateTime"].strip()

    # Parse base_time into datetime object
    try:
        start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
        start_time =  start_time.strftime("%Y-%m-%dT%H:%M:%S")
        end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
        end_time =  end_time.strftime("%Y-%m-%dT%H:%M:%S")
    except ValueError:
        return jsonify({"error": "Invalid base_time format. Use YYYY-MM-DDTHH:MM:SS"}), 400

    print(f"🎯 Running detection for: {target_name} starting from {start_time}")

    # Call the detection function (synchronously)
    result = run_detection_from_server(base_dir="recordings",start_dt_str = start_time, end_dt_str=end_time, target_name=target_name)
    return jsonify(result), 200


# === Entry Point ===
if __name__ == "__main__":
    # === Background thread controller ===
    background_started = False
    background_lock = threading.Lock()
    # global background_started
    with background_lock:
        if not background_started:
            print("✅ Starting background monitoring threads...")
            # threading.Thread(target=update_camera_list_periodically, daemon=True).start()
            # threading.Thread(target=process_videos, daemon=True).start()
            # threading.Thread(target=recoding, daemon=True).start()

            background_started = True


    app.run(port = 5000, debug=False)
