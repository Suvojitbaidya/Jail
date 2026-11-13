import {
  Camera,
  CameraStatus,
  CameraType,
  Location,
} from "@/lib/app/generated/prisma/client";
import { prisma } from "@/lib/prisma/client";

// Get all cameras
export const getAllCameras = async (filter: any): Promise<Camera[]> => {
  return await prisma.camera.findMany({ where: filter });
};

// get active cameras

// Get a camera by ID
export const getCameraById = async (id: number): Promise<Camera | null> => {
  return await prisma.camera.findUnique({ where: { id } });
};

// Create a new camera
export const createCamera = async (data: {
  name: string;
  location: Location;
  ipAddress: string;
  port: number;
  type: CameraType;
  protocol: string;
  status: CameraStatus;
  userId: number;
  heightThreshold: number;
  alertThreshold: number;
  createdById: number;
  updatedById: number;
  cameraUrl: string;
}): Promise<Camera> => {
  return await prisma.camera.create({
    data: {
      name: data.name,
      location: data.location,
      ipAddress: data.ipAddress,
      port: data.port,
      type: data.type,
      protocol: data.protocol,
      status: data.status,
      userId: data.userId,
      heightThreshold: data.heightThreshold,
      alertThreshold: data.alertThreshold,
      cameraUrl: data.cameraUrl,
      createdById: data.createdById,
      updatedById: data.updatedById,
    },
  });
};

/// Update an existing camera
export const updateCamera = async (
  id: number,
  data: {
    name?: string;
    location?: Location;
    ipAddress?: string;
    port?: number;
    type?: CameraType;
    protocol?: string;
    status?: CameraStatus;
    userId?: number;
    heightThreshold?: number;
    alertThreshold?: number;
    updatedById: number;
    cameraUrl: string;
  }
): Promise<Camera> => {
  return await prisma.camera.update({
    where: { id },
    data: {
      ...data,
      updatedById: data.updatedById, // explicitly ensure updatedById is always set
    },
  });
};

// Delete a camera
export const deleteCamera = async (id: number): Promise<Camera> => {
  return await prisma.camera.delete({ where: { id } });
};
