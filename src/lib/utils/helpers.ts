import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAttributeGradient(attribute: string): string {
  const gradients: Record<string, string> = {
    Vaccine: "from-blue-500 to-cyan-500",
    Data: "from-green-500 to-emerald-500",
    Virus: "from-purple-500 to-pink-500",
    Free: "from-yellow-500 to-orange-500",
    Variable: "from-red-500 to-rose-500",
  };

  return gradients[attribute] || "from-gray-500 to-slate-500";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
