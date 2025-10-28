"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Shield,
  Grid3x3,
  Zap,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/helpers";

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/digimon", label: "Digimon", icon: Database },
  { href: "/attributes", label: "Attributes", icon: Shield },
  { href: "/fields", label: "Fields", icon: Grid3x3 },
  { href: "/skills", label: "Skills", icon: Zap },
  { href: "/levels", label: "Levels", icon: TrendingUp },
];

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "w-full px-4 py-2 rounded-lg flex items-center space-x-2 transition-all",
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-lg flex items-center space-x-2 transition-all",
              isActive
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-slate-800"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
