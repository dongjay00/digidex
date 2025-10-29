import axios from "axios";
import { TypeListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export async function getTypeList(
  page: number = 0,
  pageSize: number = 20,
  name?: string
): Promise<TypeListResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("pageSize", String(pageSize));
  if (name) params.append("name", name);

  const response = await axios.get(`${API_BASE}/type?${params.toString()}`);
  return response.data;
}

export async function getTypeById(id: number | string) {
  const response = await axios.get(`${API_BASE}/type/${id}`);
  return response.data;
}
