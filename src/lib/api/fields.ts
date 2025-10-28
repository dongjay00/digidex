import axios from "axios";
import { Field, FieldListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export async function getFieldList(
  page: number = 0,
  name?: string
): Promise<FieldListResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (name) params.append("name", name);

  const response = await axios.get(`${API_BASE}/field?${params.toString()}`);
  return response.data;
}

export async function getFieldById(id: number | string): Promise<Field> {
  const response = await axios.get(`${API_BASE}/field/${id}`);
  return response.data;
}
