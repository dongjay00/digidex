/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Digimon } from "@/types/digimon";
import { useDigimonStore } from "@/store/useDigimonStore";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAttributeGradient } from "@/lib/utils/helpers";

interface DigimonDetailProps {
  digimon: Digimon;
}

export function DigimonDetail({ digimon }: DigimonDetailProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useDigimonStore();
  const favorite = isFavorite(digimon.id);

  const attributeGradient = getAttributeGradient(digimon.attribute);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Main Info Card */}
      <Card>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div
                className={`relative aspect-square bg-gradient-to-br ${attributeGradient} rounded-xl p-8`}
              >
                <Image
                  src={digimon.image}
                  alt={digimon.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Favorite Button */}
              <Button
                variant={favorite ? "primary" : "secondary"}
                className="w-full"
                onClick={() => toggleFavorite(digimon.id)}
              >
                <Star
                  className={`w-4 h-4 mr-2 ${favorite ? "fill-current" : ""}`}
                />
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {digimon.name}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant={digimon.attribute.toLowerCase() as any}>
                    {digimon.attribute}
                  </Badge>
                  <Badge variant="default">{digimon.level}</Badge>
                  <Badge variant="default">{digimon.type}</Badge>
                  {digimon.xAntibody && (
                    <Badge variant="default">X-Antibody</Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {digimon.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Release Date</p>
                  <p className="text-lg font-semibold text-white">
                    {digimon.releaseDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-lg font-semibold text-white">
                    {digimon.type}
                  </p>
                </div>
              </div>

              {digimon.fields && digimon.fields.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Fields</h3>
                  <div className="flex flex-wrap gap-2">
                    {digimon.fields.map((field, idx) => (
                      <Badge key={idx} variant="default">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      {digimon.skills && digimon.skills.length > 0 && (
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {digimon.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <h4 className="font-bold text-purple-400 mb-2">
                    {skill.skill}
                  </h4>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evolution Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prior Evolutions */}
        {digimon.priorEvolutions && digimon.priorEvolutions.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Prior Evolutions
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {digimon.priorEvolutions.map((evo, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/50 rounded-lg p-3 text-gray-300 text-sm hover:bg-slate-900 transition-colors"
                  >
                    {evo}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Evolutions */}
        {digimon.nextEvolutions && digimon.nextEvolutions.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Next Evolutions
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {digimon.nextEvolutions.map((evo, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/50 rounded-lg p-3 text-gray-300 text-sm hover:bg-slate-900 transition-colors"
                  >
                    {evo}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
