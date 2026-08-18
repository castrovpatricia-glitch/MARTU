"use client";

import { shiftMonthId } from "@/lib/date";
import { monthLabel } from "@/lib/format";
import { useUiStore } from "@/store/uiStore";

export default function MonthSwitcher() {
  const monthId = useUiStore((s) => s.selectedMonthId);
  const setMonthId = useUiStore((s) => s.setSelectedMonthId);
  const prev = shiftMonthId(monthId, -1);
  const next = shiftMonthId(monthId, 1);

  return (
    <div className="flex items-center justify-between border-b-2 border-ink px-4 sm:px-6 py-3">
      <button
        onClick={() => setMonthId(prev)}
        className="font-mono text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 opacity-60 hover:opacity-100 press-down"
      >
        <span aria-hidden>←</span> {monthLabel(prev).split(" ")[0]}
      </button>
      <h1 className="font-display text-xl sm:text-3xl tracking-wide">{monthLabel(monthId)}</h1>
      <button
        onClick={() => setMonthId(next)}
        className="font-mono text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 opacity-60 hover:opacity-100 press-down"
      >
        {monthLabel(next).split(" ")[0]} <span aria-hidden>→</span>
      </button>
    </div>
  );
}
