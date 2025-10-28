export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://digi-api.com/api/v1";

export const ATTRIBUTE_COLORS: Record<string, string> = {
  Vaccine: "from-blue-500 to-cyan-500",
  Data: "from-green-500 to-emerald-500",
  Virus: "from-purple-500 to-pink-500",
  Free: "from-yellow-500 to-orange-500",
  Variable: "from-red-500 to-rose-500",
  Unknown: "from-gray-500 to-slate-500",
};

export const LEVEL_OPTIONS = [
  { value: "", label: "All Levels" },
  { value: "baby i", label: "Baby I" },
  { value: "baby ii", label: "Baby II" },
  { value: "child", label: "Child" },
  { value: "adult", label: "Adult" },
  { value: "perfect", label: "Perfect" },
  { value: "ultimate", label: "Ultimate" },
];

export const ATTRIBUTE_OPTIONS = [
  { value: "", label: "All Attributes" },
  { value: "vaccine", label: "Vaccine" },
  { value: "data", label: "Data" },
  { value: "virus", label: "Virus" },
  { value: "free", label: "Free" },
  { value: "variable", label: "Variable" },
];

export const PAGE_SIZE = 20;
