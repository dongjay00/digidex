import React from "react";
import { DigimonListItem } from "@/types/digimon";
import { DigimonCard } from "./DigimonCard";

interface DigimonGridProps {
  digimon: DigimonListItem[];
}

export function DigimonGrid({ digimon }: DigimonGridProps) {
  if (digimon.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No Digimon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {digimon.map((digi) => (
        <DigimonCard key={digi.id} digimon={digi} />
      ))}
    </div>
  );
}
