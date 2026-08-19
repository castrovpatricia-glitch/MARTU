"use client";

import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PALETTE_BG } from "@/components/ds/palette";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";

export default function CategoryPicker({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
      {categories.map((cat) => {
        const active = cat.id === value;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-2xl px-1.5 py-2.5 press-down text-center",
              active ? "shadow-hard-sm" : "shadow-none opacity-60",
              PALETTE_BG[cat.color]
            )}
          >
            <DoodleIcon name={cat.icon} size={20} />
            <span className="font-mono text-[9.5px] font-semibold leading-tight line-clamp-2">
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
