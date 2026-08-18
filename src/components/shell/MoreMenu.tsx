"use client";

import Link from "next/link";
import Sheet from "@/components/ds/Sheet";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { useUiStore } from "@/store/uiStore";
import { MOBILE_MORE_NAV } from "./navItems";

export default function MoreMenu() {
  const open = useUiStore((s) => s.moreMenuOpen);
  const setOpen = useUiStore((s) => s.setMoreMenuOpen);

  return (
    <Sheet open={open} onClose={() => setOpen(false)} title="Más" color="bg-cream">
      <div className="grid grid-cols-2 gap-3">
        {MOBILE_MORE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 border-2 border-ink bg-white p-4 press-down shadow-hard-sm font-mono text-xs uppercase tracking-wide font-bold"
          >
            <DoodleIcon name={item.icon} />
            {item.label}
          </Link>
        ))}
      </div>
    </Sheet>
  );
}
