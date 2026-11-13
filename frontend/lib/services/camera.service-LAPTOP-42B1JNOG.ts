// services/auth.service.ts
import { url } from "../url";
import { createServerAxios } from "../utils/axios/axiosServer";

const axios = createServerAxios();

export async function getAllCameras() {
  const res = await axios.get(url.cameras);
  return res.data;
}

export async function addCameras(data: any) {
  const res = await axios.post(url.cameras, data);
  return res.data;
}

export async function updateCameras(cameraId: number, data: any) {
  const res = await axios.put(url.cameras + "/" + cameraId, data);
  return res.data;
}

export async function getCameras(cameraId: number) {
  const res = await axios.get(url.cameras + "/" + cameraId);
  return res.data;
}
