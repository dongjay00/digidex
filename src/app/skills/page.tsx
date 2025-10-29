"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSkillList } from "@/lib/api/skills";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { Zap, Search } from "lucide-react";
import { Skill } from "@/types/digimon";

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 30;

  const { data, isLoading, error } = useQuery({
    queryKey: ["skills", "list", page, pageSize, searchTerm],
    queryFn: () => getSkillList(page, pageSize, searchTerm || undefined),
  });

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading skills:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Skills Database</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          {data?.content?.description ||
            "Explore the vast collection of Digimon skills and abilities."}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search skills by name..."
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
        <Loading text="Loading skills..." />
      ) : (
        <>
          {/* Skills List */}
          <div className="space-y-3">
            {data?.content?.fields?.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
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

function SkillCard({
  skill,
}: {
  skill: { id: number; name: string; href: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [skillDetail, setSkillDetail] = useState<Skill | null>(null);

  const fetchSkillDetail = async () => {
    if (!skillDetail && !isExpanded) {
      try {
        const response = await fetch(skill.href);
        const data = await response.json();
        setSkillDetail(data);
      } catch (error) {
        console.error("Error fetching skill detail:", error);
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Card hover>
      <CardContent className="p-5">
        <button
          onClick={fetchSkillDetail}
          className="w-full text-left flex items-start justify-between group"
        >
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                {skill.name}
              </h3>
              {isExpanded && skillDetail && (
                <div className="mt-3 space-y-2">
                  {skillDetail.translation && (
                    <p className="text-sm text-gray-400">
                      <strong>Translation:</strong> {skillDetail.translation}
                    </p>
                  )}
                  {skillDetail.description && (
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {skillDetail.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="text-purple-400 text-sm ml-4">
            {isExpanded ? "Hide" : "Show"} Details
          </div>
        </button>
      </CardContent>
    </Card>
  );
}
