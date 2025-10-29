"use client";

import React from "react";
import { useAttributeList } from "@/lib/hooks/useAttributes";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { getAttributeGradient } from "@/lib/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { getAttributeList } from "@/lib/api/attributes";
import { Attribute } from "@/types/digimon";

export default function AttributesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["attributes", "list"],
    queryFn: async () => {
      const [page0Data, page1Data] = await Promise.all([
        getAttributeList(0),
        getAttributeList(1),
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
    return <Loading text="Loading attributes..." />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading attributes: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Attributes</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          {data?.content?.description}
        </p>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.content?.fields?.map((attribute) => (
          <AttributeCard key={attribute.id} attribute={attribute} />
        ))}
      </div>

      {/* Type System Explanation */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Type Effectiveness
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Attribute system works like a &quot;Rock, Paper,
              Scissors&quot; mechanic:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>
                <strong className="text-blue-400">Vaccine</strong> is strong
                against <strong className="text-purple-400">Virus</strong>
              </li>
              <li>
                <strong className="text-purple-400">Virus</strong> is strong
                against <strong className="text-green-400">Data</strong>
              </li>
              <li>
                <strong className="text-green-400">Data</strong> is strong
                against <strong className="text-blue-400">Vaccine</strong>
              </li>
              <li>
                <strong className="text-yellow-400">Free</strong> and{" "}
                <strong className="text-red-400">Variable</strong> attributes
                are neutral
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AttributeCard({
  attribute,
}: {
  attribute: { id: number; name: string; href: string };
}) {
  const [attributeDetail, setAttributeDetail] =
    React.useState<Attribute | null>(null);

  React.useEffect(() => {
    fetch(attribute.href)
      .then((res) => res.json())
      .then((data) => setAttributeDetail(data))
      .catch((err) => console.error("Error fetching attribute detail:", err));
  }, [attribute.href]);

  const gradient = getAttributeGradient(attribute.name);

  return (
    <Card hover>
      <CardContent
        className={`p-6 bg-gradient-to-br ${gradient} bg-opacity-10`}
      >
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}
        >
          <span className="text-2xl font-bold text-white">
            {attribute.name[0]}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{attribute.name}</h3>
        <p className="text-gray-200 text-sm leading-relaxed">
          {attributeDetail?.description || ""}
        </p>
      </CardContent>
    </Card>
  );
}
