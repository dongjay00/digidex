"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDigimon } from "@/lib/hooks/useDigimon";
import { useDigimonStore } from "@/store/useDigimonStore";
import { DigimonDetail } from "@/components/digimon/DigimonDetail";
import { Loading } from "@/components/ui/Loading";

export default function DigimonDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addRecentlyViewed } = useDigimonStore();

  const { data: digimon, isLoading, error } = useDigimon(id);

  useEffect(() => {
    if (digimon) {
      addRecentlyViewed(digimon.id);
    }
  }, [digimon, addRecentlyViewed]);

  if (isLoading) {
    return <Loading text="Loading Digimon details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">
          Error loading Digimon: {error.message}
        </p>
      </div>
    );
  }

  if (!digimon) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Digimon not found</p>
      </div>
    );
  }

  return <DigimonDetail digimon={digimon} />;
}
