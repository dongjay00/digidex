import React from "react";
import { StatsSection } from "@/components/sections/StatsSection";
import { QuickActions } from "@/components/sections/QuickActions";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DigiDex
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Explore the Digital World&apos;s most comprehensive Digimon database
        </p>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Get Started
        </h2>
        <QuickActions />
      </div>

      {/* Featured Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">About DigiDex</h2>
        <p className="text-gray-300 leading-relaxed">
          DigiDex is your ultimate companion for exploring the vast world of
          Digital Monsters. With comprehensive data on over 1,400 Digimon, their
          attributes, skills, evolution paths, and more, you&apos;ll have
          everything you need to become a Digimon expert. Whether you&apos;re a
          long-time fan or just starting your journey, DigiDex provides an
          intuitive and beautiful interface to discover and learn about these
          amazing creatures.
        </p>
      </div>
    </div>
  );
}
