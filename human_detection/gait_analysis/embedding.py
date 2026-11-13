import os
import torch
import numpy as np
from torchvision import transforms
from PIL import Image
from model import GaitResNet  # Make sure model.py is in the same directory or in Python path


def extract_and_save_gait_embeddings(
    dataset_folder="gait",
    model_path="gait_resnet_triplet.pth",
    output_npz="known_gait_embeddings.npz"
):
    # Load device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load model
    model = GaitResNet()
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device).eval()

    # Transformation
    transform = transforms.Compose([
        transforms.Resize((112, 56)),
        transforms.ToTensor(),
    ])

    known_embeddings = []
    known_labels = []

    # Loop over dataset
    for label in os.listdir(dataset_folder):
        person_dir = os.path.join(dataset_folder, label)
        if not os.path.isdir(person_dir):
            continue
        for img_name in os.listdir(person_dir):
            img_path = os.path.join(person_dir, img_name)
            try:
                image = Image.open(img_path).convert("RGB")
                image = transform(image).unsqueeze(0).to(device)
                with torch.no_grad():
                    emb = model(image).cpu().numpy()[0]
                known_embeddings.append(emb)
                known_labels.append(label)
            except Exception as e:
                print(f"Skipping {img_path}: {e}")

    # Save
    np.savez(output_npz, embeddings=known_embeddings, labels=known_labels)
    print(f"✅ Saved {len(known_embeddings)} embeddings to {output_npz}")


# Run only if file is called directly
if __name__ == "__main__":
    extract_and_save_gait_embeddings()
