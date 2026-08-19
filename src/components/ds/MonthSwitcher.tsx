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
    <div className="flex items-center justify-between bg-white rounded-full shadow-hard-sm px-2 py-2">
      <button
        onClick={() => setMonthId(prev)}
        className="font-mono text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-ink/50 hover:text-ink press-down rounded-full px-3 py-2"
      >
        <span aria-hidden>←</span> {monthLabel(prev).split(" ")[0]}
      </button>
      <h1 className="font-display font-bold text-lg sm:text-2xl">{monthLabel(monthId)}</h1>
      <button
        onClick={() => setMonthId(next)}
        className="font-mono text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-ink/50 hover:text-ink press-down rounded-full px-3 py-2"
      >
        {monthLabel(next).split(" ")[0]} <span aria-hidden>→</span>
      </button>
    </div>
  );
}
