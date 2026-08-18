"use client";

import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import type { CalendarDay } from "@/lib/calc";

export default function CalendarGrid({
  days,
  firstWeekday,
  currency,
  locale,
  max,
}: {
  days: CalendarDay[];
  firstWeekday: number; // 0=Sun..6=Sat, day of week of the 1st
  currency: string;
  locale: string;
  max: number;
}) {
  const leadingBlanks = Array.from({ length: firstWeekday });
  return (
    <div className="grid grid-cols-7 border-l-2 border-t-2 border-ink">
      {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
        <div key={i} className="font-mono text-[10px] text-center py-1 border-r-2 border-b-2 border-ink opacity-50">
          {d}
        </div>
      ))}
      {leadingBlanks.map((_, i) => (
        <div key={`b${i}`} className="border-r-2 border-b-2 border-ink bg-ink/5 min-h-14" />
      ))}
      {days.map((day) => {
        const intensity = max > 0 ? day.total / max : 0;
        return (
          <div
            key={day.date}
            className={cn(
              "border-r-2 border-b-2 border-ink min-h-14 sm:min-h-20 p-1 sm:p-1.5 flex flex-col justify-between",
              day.total > 0 && intensity > 0.6 && "bg-orange text-white",
              day.total > 0 && intensity <= 0.6 && intensity > 0.25 && "bg-yellow",
              day.total > 0 && intensity <= 0.25 && "bg-lime"
            )}
          >
            <span className="font-mono text-[10px] opacity-70">{day.dayOfMonth}</span>
            {day.total > 0 && (
              <span className="font-mono text-[9px] sm:text-[11px] font-bold self-end">
                {formatMoney(day.total, currency, locale, { compact: true })}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
