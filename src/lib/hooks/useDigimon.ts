import { useQuery } from "@tanstack/react-query";
import {
  getDigimonList,
  getDigimonById,
  DigimonFilters,
} from "@/lib/api/digimon";

export function useDigimonList(filters: DigimonFilters = {}) {
  return useQuery({
    queryKey: ["digimon", "list", filters],
    queryFn: () => getDigimonList(filters),
    staleTime: 5 * 60 * 1000, // 5분
  });
}

export function useDigimon(id: number | string) {
  return useQuery({
    queryKey: ["digimon", id],
    queryFn: () => getDigimonById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분
  });
}
