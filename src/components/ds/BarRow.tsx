import { cn } from "@/lib/cn";
import type { PaletteColor } from "@/lib/types";
import { PALETTE_BG } from "./palette";

export default function BarRow({
  rank,
  label,
  value,
  pct,
  color = "orange",
  sublabel,
}: {
  rank?: number;
  label: string;
  value: string;
  pct: number;
  color?: PaletteColor;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-3 border-b border-ink/8 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-xs sm:text-sm flex items-baseline gap-2 min-w-0">
          {rank !== undefined && <span className="text-ink/35">{String(rank).padStart(2, "0")}</span>}
          <span className="font-semibold truncate">{label}</span>
        </span>
        <span className="font-display font-bold text-lg sm:text-xl whitespace-nowrap">{value}</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-ink/8 overflow-hidden">
        <div className={cn("h-full rounded-full", PALETTE_BG[color])} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      {sublabel && <span className="font-mono text-[11px] text-ink/50">{sublabel}</span>}
    </div>
  );
}
