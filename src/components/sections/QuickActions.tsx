"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  gradient: string;
}

function QuickActionCard({
  title,
  description,
  href,
  gradient,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className={`block bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all group`}
    >
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200 mb-4">{description}</p>
      <ChevronRight className="w-6 h-6 text-purple-300 group-hover:translate-x-2 transition-transform" />
    </Link>
  );
}

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <QuickActionCard
        title="Explore Digimon"
        description="Browse through all available Digimon with advanced filters"
        href="/digimon"
        gradient="from-cyan-500/20 to-purple-500/20"
      />
      <QuickActionCard
        title="Learn Attributes"
        description="Understand the type advantages and Digimon attributes"
        href="/attributes"
        gradient="from-green-500/20 to-blue-500/20"
      />
      <QuickActionCard
        title="Discover Skills"
        description="Explore the vast database of Digimon skills and abilities"
        href="/skills"
        gradient="from-yellow-500/20 to-orange-500/20"
      />
    </div>
  );
}
