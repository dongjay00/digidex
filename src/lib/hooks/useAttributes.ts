import { useQuery } from "@tanstack/react-query";
import { getAttributeList, getAttributeById } from "@/lib/api/attributes";

export function useAttributeList(page: number = 0, name?: string) {
  return useQuery({
    queryKey: ["attributes", "list", page, name],
    queryFn: () => getAttributeList(page, name),
    staleTime: 10 * 60 * 1000,
  });
}

export function useAttribute(id: number | string) {
  return useQuery({
    queryKey: ["attributes", id],
    queryFn: () => getAttributeById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}
