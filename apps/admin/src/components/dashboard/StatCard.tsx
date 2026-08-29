import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export const StatCard = ({ label, value, change, trend, icon: Icon }: StatCardProps) => (
  <div className="bg-white border border-neutral-200 rounded-xl p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
        <Icon size={18} className="text-orange-600" />
      </div>
      <span
        className={`flex items-center gap-1 text-xs font-semibold ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}
      >
        {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
    </div>
    <p className="text-2xl font-bold text-neutral-900">{value}</p>
    <p className="text-sm text-neutral-500 mt-1">{label}</p>
  </div>
);