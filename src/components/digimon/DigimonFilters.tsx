"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useFilterStore } from "@/store/useFilterStore";
import { LEVEL_OPTIONS, ATTRIBUTE_OPTIONS } from "@/lib/utils/constants";
import { Button } from "@/components/ui/Button";

export function DigimonFilters() {
  const {
    searchTerm,
    attribute,
    level,
    xAntibody,
    setSearchTerm,
    setAttribute,
    setLevel,
    setXAntibody,
    resetFilters,
  } = useFilterStore();

  const hasActiveFilters = searchTerm || attribute || level || xAntibody;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Digimon by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>

        {/* Attribute Filter */}
        <select
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer"
        >
          {ATTRIBUTE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Level Filter */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer"
        >
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* X-Antibody Filter */}
        <select
          value={xAntibody}
          onChange={(e) => setXAntibody(e.target.value)}
          className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer"
        >
          <option value="">X-Antibody: All</option>
          <option value="true">X-Antibody: Yes</option>
          <option value="false">X-Antibody: No</option>
        </select>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
