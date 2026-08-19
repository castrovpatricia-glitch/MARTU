"use client";

import Sheet from "@/components/ds/Sheet";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { useUiStore, type QuickAddKind } from "@/store/uiStore";
import type { DoodleIconName, PaletteColor } from "@/lib/types";

const OPTIONS: { kind: QuickAddKind; label: string; icon: DoodleIconName; color: PaletteColor }[] = [
  { kind: "expense", label: "Gasto", icon: "bag", color: "orange" },
  { kind: "income", label: "Ingreso", icon: "coin", color: "lime" },
  { kind: "transfer", label: "Transferencia", icon: "arrow", color: "blue" },
  { kind: "saving", label: "Ahorro", icon: "piggy", color: "mint" },
];

export default function FabMenu() {
  const fabMenuOpen = useUiStore((s) => s.fabMenuOpen);
  const setFabMenuOpen = useUiStore((s) => s.setFabMenuOpen);
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);

  return (
    <Sheet open={fabMenuOpen} onClose={() => setFabMenuOpen(false)} title="¿Qué querés registrar?" color="bg-cream">
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.kind}
            onClick={() => openQuickAdd(opt.kind)}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white p-5 press-down shadow-hard-sm"
          >
            <span
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `var(--color-${opt.color})` }}
            >
              <DoodleIcon name={opt.icon} />
            </span>
            <span className="font-mono text-xs font-bold">{opt.label}</span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}
