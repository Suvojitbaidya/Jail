// lib/utils/axios/axiosServer.ts
import axios from "axios";

export function createServerAxios(token?: string) {
  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return instance;
}
