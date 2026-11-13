from flask import Flask, request, jsonify
import face_recognition
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from werkzeug.utils import secure_filename
from io import BytesIO
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# ---------- Settings ----------
BASE_FOLDER = "dataset"          # Folder with subfolders per person

MARKED_FOLDER = "Processed"   # Folder to save processed images
# Make sure the output folder exists
os.makedirs(MARKED_FOLDER, exist_ok=True)



# ---------- Load Known Encodings ----------
def get_face_encodings_from_folder(folder_path):
    encodings = []
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        image = face_recognition.load_image_file(file_path)
        face_locations = face_recognition.face_locations(image)
        face_encodings = face_recognition.face_encodings(image, face_locations)
        if face_encodings:
            encodings.append(face_encodings[0])
    return encodings

def load_all_encodings(base_folder):
    encoding_dict = {}
    for person_folder in os.listdir(base_folder):
        full_path = os.path.join(base_folder, person_folder)
        if os.path.isdir(full_path):
            encodings = get_face_encodings_from_folder(full_path)
            if encodings:
                encoding_dict[person_folder] = encodings
    return encoding_dict

# ---------- Identify and Annotate ----------
def identify_faces_without_distance(image_np, known_encodings_dict, threshold=0.5):
    face_locations = face_recognition.face_locations(image_np)
    face_encodings = face_recognition.face_encodings(image_np, face_locations)

    if not face_encodings:
        return None, None  # No face found

    pil_img = Image.fromarray(image_np)
    draw = ImageDraw.Draw(pil_img)

    try:
        font = ImageFont.truetype("arial.ttf", 18)
    except:
        font = ImageFont.load_default()

    face_dict = {}

    for idx, (face_encoding, location) in enumerate(zip(face_encodings, face_locations)):
        best_match = "unknown"
        min_distance = float("inf")

        for person, encodings in known_encodings_dict.items():
            for known_encoding in encodings:
                distance = np.linalg.norm(known_encoding - face_encoding)
                if distance < min_distance:
                    min_distance = distance
                    best_match = person

        label = best_match if min_distance < threshold else "unknown"
        face_dict[f"{idx + 1}"] = label

        # Draw box and label
        top, right, bottom, left = location
        draw.rectangle(((left, top), (right, bottom)), outline='green', width=2)
        draw.rectangle([(left, top - 20), (right, top)], fill="green")
        draw.text((left + 2, top - 18), label, fill='white', font=font)

    return [face_dict], pil_img

# ---------- API Route ----------
@app.route('/process_image', methods=['POST'])
def process_image():
    print("Processing..")
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"success": False, "message": "Empty filename"}), 400
    
    # Save the marked image
    current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
    filename = f"IMG_{current_time}.jpg"

    # filename = secure_filename(file.filename)
    image_stream = BytesIO(file.read())
    image_np = face_recognition.load_image_file(image_stream)

    known_encodings = load_all_encodings(BASE_FOLDER)
    results, annotated_img = identify_faces_without_distance(image_np, known_encodings)

    if results is None:
        return jsonify({
            "success": False,
            "message": "No faces detected."
        })
    # Save the image with height calulation in the specific date folder
    current_date = str(datetime.now().strftime("%Y-%m-%d"))
    OUTPUT_FOLDER = os.path.join(MARKED_FOLDER,current_date)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    output_path = os.path.join(OUTPUT_FOLDER, filename)
    annotated_img.save(output_path)

    return jsonify({
        "success": True,
        "faces": results,
        "url": filename
    })

if __name__ == '__main__':
    app.run(debug=True)