"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLevelList } from "@/lib/api/levels";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { TrendingUp } from "lucide-react";
import { Level } from "@/types/digimon";

export default function LevelsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["levels", "list"],
    queryFn: async () => {
      const [page0Data, page1Data] = await Promise.all([
        getLevelList(0),
        getLevelList(1),
      ]);

      const combinedFields = [
        ...(page0Data.content?.fields || []),
        ...(page1Data.content?.fields || []),
      ];

      return {
        ...page0Data,
        content: {
          ...page0Data.content,
          fields: combinedFields,
        },
      };
    },
  });

  if (isLoading) {
    return <Loading text="Loading levels..." />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading levels:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  // 레벨 순서 정렬
  const levelOrder = [
    "Baby I",
    "Baby II",
    "Child",
    "Adult",
    "Perfect",
    "Ultimate",
    "Armor",
    "Hybrid",
    "Unknown",
  ];
  const sortedLevels = data?.content?.fields?.sort((a, b) => {
    const indexA = levelOrder.indexOf(a.name);
    const indexB = levelOrder.indexOf(b.name);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Evolution Stages</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          {data?.content?.description ||
            "Learn about the different evolution stages in a Digimon's life cycle."}
        </p>
      </div>

      {/* Evolution Path Visualization */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Evolution Path</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sortedLevels?.slice(0, 9).map((level, index) => (
              <React.Fragment key={level.id}>
                <div className="text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${getLevelGradient(
                      level.name
                    )} rounded-full flex items-center justify-center mb-2`}
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {level.name}
                  </p>
                </div>
                {index < 5 && <div className="text-purple-400 text-2xl">→</div>}
                {index >= 5 && index < 8 && (
                  <div className="text-purple-400 text-2xl">|</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedLevels?.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

function LevelCard({
  level,
}: {
  level: { id: number; name: string; href: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [levelDetail, setLevelDetail] = React.useState<Level | null>(null);

  React.useEffect(() => {
    fetch(level.href)
      .then((res) => res.json())
      .then((data) => setLevelDetail(data))
      .catch((err) => console.error("Error fetching level detail:", err));
  }, [level.href]);

  const gradient = getLevelGradient(level.name);

  return (
    <Card hover>
      <CardContent className="p-6">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}
        >
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{level.name}</h3>
        {levelDetail?.description && (
          <p className="text-gray-300 text-sm leading-relaxed">
            {levelDetail.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function getLevelGradient(levelName: string): string {
  const gradients: Record<string, string> = {
    "Baby I": "from-pink-400 to-rose-500",
    "Baby II": "from-pink-500 to-red-500",
    Child: "from-blue-400 to-cyan-500",
    Adult: "from-green-500 to-emerald-600",
    Perfect: "from-yellow-500 to-orange-600",
    Ultimate: "from-purple-500 to-pink-600",
    Armor: "from-amber-500 to-yellow-600",
    Hybrid: "from-indigo-500 to-purple-600",
    Unknown: "from-gray-500 to-slate-600",
  };

  return gradients[levelName] || "from-purple-500 to-pink-600";
}
