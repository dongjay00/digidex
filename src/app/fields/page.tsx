"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFieldList } from "@/lib/api/fields";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";

export default function FieldsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["fields", "list"],
    queryFn: () => getFieldList(),
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
  const fieldDescriptions: Record<string, string> = {
    "Metal Empire":
      "Machine, cyborg, or other mechanical Digimon. Can represent cities and factories.",
    "Nature Spirits":
      "Beast and plant-type Digimon that embody the natural world.",
    "Nightmare Soldiers":
      "Dark and undead-type Digimon associated with darkness and nightmares.",
    "Wind Guardians": "Bird and wind-type Digimon that rule the skies.",
    "Deep Savers":
      "Aquatic Digimon that inhabit the depths of the Digital World's oceans.",
    "Dragon's Roar":
      "Dragon-type Digimon known for their immense power and ferocity.",
    "Virus Busters":
      "Holy and angelic Digimon that fight against evil and corruption.",
    Unknown: "Digimon with mysterious or undefined field classifications.",
    "Jungle Troopers":
      "Insect and plant Digimon that thrive in jungle environments.",
    "Dark Area": "Digimon from the darkest regions of the Digital World.",
  };

  const fieldColors: Record<string, string> = {
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

  const gradient = fieldColors[field.name] || "from-purple-500 to-pink-600";

  return (
    <Card hover>
      <CardContent className="p-6">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}
        >
          <span className="text-2xl font-bold text-white">{field.name[0]}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{field.name}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {fieldDescriptions[field.name] ||
            "A unique field in the Digital World."}
        </p>
        <a
          href={field.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View Details
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}
