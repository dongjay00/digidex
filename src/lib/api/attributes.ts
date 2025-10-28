import axios from "axios";
import { Attribute, AttributeListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export async function getAttributeList(
  page: number = 0,
  name?: string
): Promise<AttributeListResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (name) params.append("name", name);

  const response = await axios.get(
    `${API_BASE}/attribute?${params.toString()}`
  );
  return response.data;
}

export async function getAttributeById(
  id: number | string
): Promise<Attribute> {
  const response = await axios.get(`${API_BASE}/attribute/${id}`);
  return response.data;
}
