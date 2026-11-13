import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
from pytorch_metric_learning.losses import TripletMarginLoss
from pytorch_metric_learning.miners import TripletMarginMiner
from torchvision.models import resnet18, ResNet18_Weights
from embedding import extract_and_save_gait_embeddings
# -----------------------------
# ✅ Step 1: Prepare Device
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

# -----------------------------
# ✅ Step 2: Transformations
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((112, 56)),  # Small for Kaggle
    transforms.ToTensor(),
])

# -----------------------------
# ✅ Step 3: Load Dataset
# -----------------------------
dataset = datasets.ImageFolder("gait", transform=transform)
loader = DataLoader(
    dataset,
    batch_size=8,  # Safe batch size for Kaggle
    shuffle=True,
    num_workers=0,
    pin_memory=False
)
print(f"Loaded {len(dataset)} images from {len(dataset.classes)} identities.")

# -----------------------------
# ✅ Step 4: Define Model
# -----------------------------
class GaitResNet(nn.Module):
    def __init__(self, embedding_dim=128):
        super().__init__()
        base = resnet18(weights=ResNet18_Weights.DEFAULT)
        base.fc = nn.Identity()  # Remove original classification layer
        self.backbone = base
        self.fc = nn.Linear(512, embedding_dim)

    def forward(self, x):
        x = self.backbone(x)
        x = self.fc(x)
        return nn.functional.normalize(x, p=2, dim=1)  # L2 normalization

model = GaitResNet().to(device)

# -----------------------------
# ✅ Step 5: Loss & Optimizer
# -----------------------------
optimizer = optim.Adam(model.parameters(), lr=1e-4)
loss_fn = TripletMarginLoss(margin=0.3)
miner = TripletMarginMiner(margin=0.3, type_of_triplets="semi_hard")

# -----------------------------
# ✅ Step 6: Train Model
# -----------------------------
epochs = 10
for epoch in range(epochs):
    model.train()
    total_loss = 0
    for imgs, labels in loader:
        imgs, labels = imgs.to(device), labels.to(device)

        embeddings = model(imgs)
        hard_triplets = miner(embeddings, labels)
        loss = loss_fn(embeddings, labels, hard_triplets)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(f"Epoch [{epoch+1}/{epochs}], Loss: {total_loss / len(loader):.4f}")

# -----------------------------
# ✅ Step 7: Save Model
# -----------------------------
# os.makedirs("saved_models", exist_ok=True)
torch.save(model.state_dict(), "gait_resnet_triplet.pth")
print("Model saved as gait_resnet_triplet.pth")


extract_and_save_gait_embeddings()