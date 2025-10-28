import React from "react";
import { cn } from "@/lib/utils/helpers";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "vaccine" | "data" | "virus" | "free" | "unknown";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-purple-600/20 text-purple-300 border-purple-500/30",
    vaccine: "bg-blue-600/20 text-blue-300 border-blue-500/30",
    data: "bg-green-600/20 text-green-300 border-green-500/30",
    virus: "bg-purple-600/20 text-purple-300 border-purple-500/30",
    free: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
    unknown: "bg-gray-600/20 text-gray-300 border-gray-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
