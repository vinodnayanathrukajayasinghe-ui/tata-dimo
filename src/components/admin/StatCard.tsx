import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  accentClassName,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accentClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-charcoal/60">{label}</span>
        <Icon className={cn("h-5 w-5", accentClassName ?? "text-primary")} />
      </div>
      <p className="mt-3 text-3xl font-bold text-charcoal">{value}</p>
    </div>
  );
}
