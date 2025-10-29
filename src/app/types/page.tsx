"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTypeList } from "@/lib/api/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { Search, Shield } from "lucide-react";
import { Type } from "@/types/digimon";

export default function TypesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ["types", "list", page, pageSize, searchTerm],
    queryFn: () => getTypeList(page, pageSize, searchTerm || undefined),
  });

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading types:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Types Database</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          {data?.content?.description || "Explore the various Digimon types."}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search types by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <Loading text="Loading types..." />
      ) : (
        <>
          {/* Types List */}
          <div className="space-y-3">
            {data?.content?.fields?.map((type) => (
              <TypeCard key={type.id} type={type} />
            ))}
          </div>

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

function TypeCard({
  type,
}: {
  type: { id: number; name: string; href: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [typeDetail, setTypeDetail] = useState<Type | null>(null);

  const fetchTypeDetail = async () => {
    if (!typeDetail && !isExpanded) {
      try {
        const response = await fetch(type.href);
        const data = await response.json();
        setTypeDetail(data);
      } catch (error) {
        console.error("Error fetching type detail:", error);
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Card hover>
      <CardContent className="p-5">
        <button
          onClick={fetchTypeDetail}
          className="w-full text-left flex items-start justify-between group"
        >
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                {type.name}
              </h3>
              {isExpanded && typeDetail && (
                <div className="mt-3 space-y-2">
                  {typeDetail.description && (
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {typeDetail.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {typeDetail?.description && (
            <div className="text-purple-400 text-sm ml-4">
              {isExpanded ? "Hide" : "Show"} Details
            </div>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
