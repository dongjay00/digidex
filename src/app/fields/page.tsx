"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFieldList } from "@/lib/api/fields";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import { Field } from "@/types/digimon";
import Image from "next/image";

export default function FieldsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["fields", "list"],
    queryFn: async () => {
      const [page0Data, page1Data] = await Promise.all([
        getFieldList(0),
        getFieldList(1),
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

  const filteredFields = data?.content?.fields?.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loading text="Loading fields..." />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading fields:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Fields</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          {data?.content?.description}
        </p>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFields?.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
}

function FieldCard({
  field,
}: {
  field: { id: number; name: string; href: string };
}) {
  const [fieldDetail, setFieldDetail] = React.useState<Field | null>(null);

  React.useEffect(() => {
    fetch(field.href)
      .then((res) => res.json())
      .then((data) => setFieldDetail(data))
      .catch((err) => console.error("Error fetching field detail:", err));
  }, [field.href]);

  const gradient = getFieldGradient(field.name);

  return (
    <Card hover className="relative">
      <CardContent className="p-6">
        {fieldDetail?.href && (
          <div className="absolute top-6 right-6 w-16 h-16">
            <Image
              src={fieldDetail.href}
              alt={fieldDetail.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        )}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}
        >
          <span className="text-2xl font-bold text-white">{field.name[0]}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{field.name}</h3>
        {fieldDetail?.description && (
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {fieldDetail.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function getFieldGradient(fieldName: string): string {
  const gradients: Record<string, string> = {
    "Metal Empire": "from-gray-500 to-slate-600",
    "Nature Spirits": "from-green-500 to-emerald-600",
    "Nightmare Soldiers": "from-purple-600 to-violet-700",
    "Wind Guardians": "from-cyan-500 to-sky-600",
    "Deep Savers": "from-blue-500 to-indigo-600",
    "Dragon's Roar": "from-red-500 to-orange-600",
    "Virus Busters": "from-yellow-400 to-amber-500",
    Unknown: "from-gray-600 to-slate-700",
    "Jungle Troopers": "from-lime-500 to-green-600",
    "Dark Area": "from-slate-800 to-gray-900",
  };

  return gradients[fieldName] || "from-gray-500 to-slate-600";
}
