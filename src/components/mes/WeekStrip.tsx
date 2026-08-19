import { cn } from "@/lib/cn";
import type { WeekSummary } from "@/lib/calc";

const LETTERS = ["D", "L", "M", "M", "J", "V", "S"];

export default function WeekStrip({ week }: { week: WeekSummary }) {
  const max = Math.max(...week.days.map((d) => d.total), 1);
  return (
    <div className="grid grid-cols-7 gap-1.5 items-end h-28">
      {week.days.map((d) => {
        const h = Math.max((d.total / max) * 100, d.total > 0 ? 8 : 3);
        return (
          <div key={d.date} className="flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full flex-1 flex items-end">
              <div
                className={cn("w-full rounded-full", d.total > 0 ? "bg-orange" : "bg-ink/8")}
                style={{ height: `${h}%` }}
              />
            </div>
            <span className="font-mono text-[9px] font-bold">{LETTERS[d.dayOfWeek]}</span>
          </div>
        );
      })}
    </div>
  );
}
