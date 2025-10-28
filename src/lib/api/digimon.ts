import axios from "axios";
import { Digimon, DigimonListResponse } from "@/types/digimon";
import { API_BASE } from "@/lib/utils/constants";

export interface DigimonFilters {
  name?: string;
  exact?: boolean;
  attribute?: string;
  xAntibody?: string;
  level?: string;
  page?: number;
  pageSize?: number;
}

export async function getDigimonList(
  filters: DigimonFilters = {}
): Promise<DigimonListResponse> {
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  if (filters.exact !== undefined)
    params.append("exact", String(filters.exact));
  if (filters.attribute) params.append("attribute", filters.attribute);
  if (filters.xAntibody) params.append("xAntibody", filters.xAntibody);
  if (filters.level) params.append("level", filters.level);
  if (filters.page !== undefined) params.append("page", String(filters.page));
  if (filters.pageSize !== undefined)
    params.append("pageSize", String(filters.pageSize));

  const response = await axios.get(`${API_BASE}/digimon?${params.toString()}`);
  return response.data;
}

export async function getDigimonById(id: number | string): Promise<Digimon> {
  const response = await axios.get(`${API_BASE}/digimon/${id}`);
  return response.data;
}

export async function getDigimonByName(name: string): Promise<Digimon> {
  const response = await axios.get(`${API_BASE}/digimon/${name}`);
  return response.data;
}
