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
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-cream min-h-screen sticky top-0 px-3 py-4">
      <div className="px-3 pb-4">
        <Link href="/" className="font-display font-bold text-3xl leading-none block">
          MARTU
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-widest mt-1 opacity-50">
          money, mostly
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {PRIMARY_NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-full font-mono text-sm font-semibold transition-colors",
                active ? "bg-ink text-paper" : "text-ink/70 hover:bg-white"
              )}
            >
              <DoodleIcon name={item.icon} size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-1 pt-4">
        <button
          onClick={() => openQuickAdd("expense")}
          className="w-full bg-ink text-paper font-sans font-bold rounded-full px-4 py-3.5 shadow-hard-sm press-down flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Agregar gasto
        </button>
        <p className="font-mono text-[10px] text-center mt-2 opacity-40">tecla “+” para agregar rápido</p>
      </div>
    </aside>
  );
}
