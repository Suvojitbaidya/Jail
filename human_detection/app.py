# File: app.py
import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from io import BytesIO
from PIL import Image
import numpy as np

# Import from subfolders
from gait_analysis.test import process_video
from human_recognition.identification import identify_faces

app = Flask(__name__)
CORS(app)

@app.route("/verify", methods=["POST"])
def verify_gait():
    data = request.json
    if "name" not in data:
        return jsonify({"error": "Missing 'name' in request"}), 400

    target_name = data["name"]
    video_path = "gait_analysis/random_people.mov"  # You can customize this path

    if not os.path.exists(video_path):
        return jsonify({"error": "Video file not found"}), 404

    success = process_video(video_path, target_name,base_time_str="14:30:00")
    return jsonify(success)


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

if __name__ == "__main__":
    app.run(debug=True)
