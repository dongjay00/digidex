import React from "react";
import { Database, Shield, Zap, Grid3x3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

function StatCard({ title, value, icon: Icon, gradient }: StatCardProps) {
  return (
    <Card hover>
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Digimon"
        value="1,488"
        icon={Database}
        gradient="from-cyan-500 to-blue-600"
      />
      <StatCard
        title="Attributes"
        value="7"
        icon={Shield}
        gradient="from-green-500 to-emerald-600"
      />
      <StatCard
        title="Skills"
        value="3,780"
        icon={Zap}
        gradient="from-yellow-500 to-orange-600"
      />
      <StatCard
        title="Fields"
        value="10"
        icon={Grid3x3}
        gradient="from-purple-500 to-pink-600"
      />
    </div>
  );
}
