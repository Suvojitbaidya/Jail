// services/auth.service.ts
import { url } from "../url";
import { createServerAxios } from "../utils/axios/axiosServer";
const axios = createServerAxios();
export async function getRecentAlert(type = "HEIGHT") {
  const res = await axios.get(url.alerts + "?type=" + type);
  return res.data;
}
