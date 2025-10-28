import axios from "axios";
import { Level, LevelListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export async function getLevelList(
  page: number = 0,
  name?: string
): Promise<LevelListResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (name) params.append("name", name);

  const response = await axios.get(`${API_BASE}/level?${params.toString()}`);
  return response.data;
}

export async function getLevelById(id: number | string): Promise<Level> {
  const response = await axios.get(`${API_BASE}/level/${id}`);
  return response.data;
}
