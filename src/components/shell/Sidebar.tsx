"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PRIMARY_NAV } from "./navItems";
import { useUiStore } from "@/store/uiStore";

export default function Sidebar() {
  const pathname = usePathname();
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r-2 border-ink bg-cream min-h-screen sticky top-0">
      <div className="p-5 border-b-2 border-ink">
        <Link href="/" className="font-display text-3xl leading-none block">
          MARTU
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-widest mt-1 opacity-60">
          money, mostly
        </p>
      </div>

      <nav className="flex-1 py-3">
        {PRIMARY_NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 font-mono text-sm uppercase tracking-wide border-l-4 transition-colors",
                active ? "border-orange bg-white font-bold" : "border-transparent hover:bg-white/60"
              )}
            >
              <DoodleIcon name={item.icon} size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-ink">
        <button
          onClick={() => openQuickAdd("expense")}
          className="w-full bg-ink text-paper font-sans font-bold uppercase tracking-wide px-4 py-3 border-2 border-ink shadow-hard-sm press-down flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Agregar gasto
        </button>
        <p className="font-mono text-[10px] text-center mt-2 opacity-50">tecla “+” para agregar rápido</p>
      </div>
    </aside>
  );
}
