/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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

  const attribute = digimon.attributes[0]?.attribute || "default";
  const attributeGradient = getAttributeGradient(attribute);
  const mainImage = digimon.images.find((img) => !img.transparent)?.href;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <div className="flex justify-center items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </div>
      </Button>

      <Card>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div
                className={`relative aspect-square bg-gradient-to-br ${attributeGradient} rounded-xl p-8`}
              >
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt={digimon.name}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              <Button
                variant={favorite ? "primary" : "secondary"}
                className="w-full"
                onClick={() => toggleFavorite(digimon.id)}
              >
                <div className="flex justify-center items-center">
                  <Star
                    className={`w-4 h-4 mr-2 ${favorite ? "fill-current" : ""}`}
                  />
                  {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </div>
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {digimon.name}
                  {digimon.xAntibody && (
                    <span className="text-2xl text-cyan-400 ml-2">
                      (X-Antibody)
                    </span>
                  )}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4">
                  {digimon.levels.map((level) => (
                    <Badge key={level.id} variant="default">
                      {level.level}
                    </Badge>
                  ))}
                  {digimon.types.map((type) => (
                    <Badge key={type.id} variant="default">
                      {type.type}
                    </Badge>
                  ))}
                  {digimon.attributes.map((attr) => (
                    <Badge
                      key={attr.id}
                      variant={attr.attribute.toLowerCase() as any}
                    >
                      {attr.attribute}
                    </Badge>
                  ))}
                </div>
              </div>

              {digimon.descriptions && digimon.descriptions.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {digimon.descriptions.find((d) => d.language === "en_us")
                      ?.description || digimon.descriptions[0].description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Release Date</p>
                  <p className="text-lg font-semibold text-white">
                    {digimon.releaseDate}
                  </p>
                </div>
              </div>

              {digimon.fields && digimon.fields.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Fields</h3>
                  <div className="flex flex-wrap gap-2">
                    {digimon.fields.map((field) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Image
                          src={field.image}
                          alt={field.field}
                          width={24}
                          height={24}
                        />
                        <Badge variant="default">{field.field}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {digimon.skills && digimon.skills.length > 0 && (
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {digimon.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <h4 className="font-bold text-purple-400 mb-2">
                    {skill.skill}
                  </h4>
                  <p className="text-sm text-gray-400">{skill.translation}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {digimon.priorEvolutions && digimon.priorEvolutions.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Prior Evolutions
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {digimon.priorEvolutions.map((evo) => (
                  <Link href={`/digimon/${evo.id}`} key={evo.id}>
                    <div className="flex items-center gap-4 bg-slate-900/50 rounded-lg p-3 text-gray-300 text-sm hover:bg-slate-900 transition-colors">
                      <Image
                        src={evo.image}
                        alt={evo.digimon}
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-semibold">{evo.digimon}</p>
                        <p className="text-xs text-gray-400">{evo.condition}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {digimon.nextEvolutions && digimon.nextEvolutions.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Next Evolutions
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {digimon.nextEvolutions.map((evo) => (
                  <Link href={`/digimon/${evo.id}`} key={evo.id}>
                    <div className="flex items-center gap-4 bg-slate-900/50 rounded-lg p-3 text-gray-300 text-sm hover:bg-slate-900 transition-colors">
                      <Image
                        src={evo.image}
                        alt={evo.digimon}
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-semibold">{evo.digimon}</p>
                        <p className="text-xs text-gray-400">{evo.condition}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
