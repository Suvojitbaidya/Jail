# File: face_processor.py
import torch
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from facenet_pytorch import MTCNN, InceptionResnetV1
import pickle
import os

device = 'cuda' if torch.cuda.is_available() else 'cpu'

mtcnn = MTCNN(keep_all=True, device=device)
resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

def identify_faces(image_np, known_data_path='human_recognition/known_faces.pkl', threshold=0.7):
    img = Image.fromarray(image_np).convert('RGB')
    boxes, _ = mtcnn.detect(img)
    faces = mtcnn(img)

    if boxes is None or faces is None:
        return None, None

    with open(known_data_path, 'rb') as f:
        known_embeddings, known_names = pickle.load(f)

    annotated_img = img.copy()
    draw = ImageDraw.Draw(annotated_img)
    try:
        font = ImageFont.truetype("arial.ttf", 18)
    except:
        font = ImageFont.load_default()

    face_dict = {}

    for i, (face, box) in enumerate(zip(faces, boxes)):
        with torch.no_grad():
            emb = resnet(face.unsqueeze(0).to(device)).cpu().numpy().reshape(1, -1)
        sims = np.dot(np.array(known_embeddings), emb.T).squeeze()
        idx = np.argmax(sims)
        score = sims[idx]
        name = known_names[idx] if score > threshold else "unknown"
        face_dict[f"{i+1}"] = name

        left, top, right, bottom = map(int, box)
        draw.rectangle(((left, top), (right, bottom)), outline='green', width=2)
        draw.rectangle([(left, top - 20), (right, top)], fill="green")
        draw.text((left + 2, top - 18), name, fill='white', font=font)

    return [face_dict], annotated_img
