// services/auth.service.ts
import { url } from "../url";
import axiosClient from "../utils/axios/axiosClient";

export async function login(email: string, password: string) {
  const res = await axiosClient.post(url.login, { email, password });
  return res.data;
}

export async function logout() {
  await axiosClient.post("/auth/logout");
}
