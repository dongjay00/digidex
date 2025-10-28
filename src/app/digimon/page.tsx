"use client";

import React from "react";
import { useDigimonList } from "@/lib/hooks/useDigimon";
import { useFilterStore } from "@/store/useFilterStore";
import { DigimonGrid } from "@/components/digimon/DigimonGrid";
import { DigimonFilters } from "@/components/digimon/DigimonFilters";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { PAGE_SIZE } from "@/lib/utils/constants";

export default function DigimonPage() {
  const { searchTerm, attribute, level, xAntibody, page, setPage } =
    useFilterStore();

  const { data, isLoading, error } = useDigimonList({
    name: searchTerm || undefined,
    attribute: attribute || undefined,
    level: level || undefined,
    xAntibody: xAntibody || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading Digimon: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Digimon Database</h1>
        <p className="text-gray-400">
          Explore all {data?.pageable.totalElements || 0} Digimon
        </p>
      </div>

      {/* Filters */}
      <DigimonFilters />

      {/* Content */}
      {isLoading ? (
        <Loading text="Loading Digimon..." />
      ) : (
        <>
          <DigimonGrid digimon={data?.content || []} />

          {/* Pagination */}
          {data?.pageable && data.pageable.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 pt-8">
              <Button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                variant="secondary"
              >
                Previous
              </Button>

              <span className="text-white">
                Page {page + 1} of {data.pageable.totalPages}
              </span>

              <Button
                onClick={() =>
                  setPage(Math.min(data.pageable.totalPages - 1, page + 1))
                }
                disabled={page >= data.pageable.totalPages - 1}
                variant="secondary"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
