import React from "react";

export function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-300 mt-4">{text}</p>
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizes[size]} border-purple-500 border-t-transparent rounded-full animate-spin`}
    ></div>
  );
}
