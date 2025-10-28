import axios from "axios";
import { SkillListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export async function getSkillList(
  page: number = 0,
  pageSize: number = 20,
  name?: string
): Promise<SkillListResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("pageSize", String(pageSize));
  if (name) params.append("name", name);

  const response = await axios.get(`${API_BASE}/skill?${params.toString()}`);
  return response.data;
}

export async function getSkillById(id: number | string) {
  const response = await axios.get(`${API_BASE}/skill/${id}`);
  return response.data;
}
