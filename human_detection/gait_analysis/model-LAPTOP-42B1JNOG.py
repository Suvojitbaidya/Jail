# model.py

import torch.nn as nn

from torchvision.models import resnet18, ResNet18_Weights

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