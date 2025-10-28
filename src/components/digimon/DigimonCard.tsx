"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { DigimonListItem } from "@/types/digimon";
import { useDigimonStore } from "@/store/useDigimonStore";
import { Card } from "@/components/ui/Card";

interface DigimonCardProps {
  digimon: DigimonListItem;
}

export function DigimonCard({ digimon }: DigimonCardProps) {
  const { isFavorite, toggleFavorite } = useDigimonStore();
  const favorite = isFavorite(digimon.id);

  return (
    <Card hover className="overflow-hidden group">
      <Link href={`/digimon/${digimon.id}`}>
        <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800">
          <Image
            src={digimon.image}
            alt={digimon.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(digimon.id);
            }}
            className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-lg hover:bg-slate-900 transition-colors z-10"
          >
            <Star
              className={`w-5 h-5 ${
                favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">
            {digimon.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">ID: {digimon.id}</p>
        </div>
      </Link>
    </Card>
  );
}
