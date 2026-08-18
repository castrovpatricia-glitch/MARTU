"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { MOBILE_MAIN_NAV } from "./navItems";
import { useUiStore } from "@/store/uiStore";

export default function BottomNav() {
  const pathname = usePathname();
  const setFabMenuOpen = useUiStore((s) => s.setFabMenuOpen);
  const fabMenuOpen = useUiStore((s) => s.fabMenuOpen);

  const [home, movs, mes] = MOBILE_MAIN_NAV;

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t-2 border-ink bg-cream">
      <div className="grid grid-cols-5 items-stretch">
        <NavLink item={home} active={pathname === "/"} />
        <NavLink item={movs} active={pathname.startsWith("/movimientos")} />

        <div className="flex items-center justify-center">
          <button
            aria-label="Agregar"
            onClick={() => setFabMenuOpen(!fabMenuOpen)}
            className="w-14 h-14 -mt-6 rounded-full bg-orange text-white border-2 border-ink shadow-hard flex items-center justify-center press-down"
          >
            <span className="text-3xl leading-none pb-1">+</span>
          </button>
        </div>

        <NavLink item={mes} active={pathname.startsWith("/mes")} />

        <NavLink item={{ href: "/mas", label: "Más", icon: "dots" }} active={isMoreActive(pathname)} isMore />
      </div>
    </nav>
  );
}

function isMoreActive(pathname: string) {
  return ["/presupuestos", "/ahorros", "/metas", "/fijos", "/suscripciones", "/tarjetas", "/historial", "/ajustes", "/mas"].some(
    (p) => pathname.startsWith(p)
  );
}

function NavLink({
  item,
  active,
  isMore,
}: {
  item: { href: string; label: string; icon: import("@/lib/types").DoodleIconName };
  active: boolean;
  isMore?: boolean;
}) {
  const setMoreMenuOpen = useUiStore((s) => s.setMoreMenuOpen);
  return (
    <Link
      href={isMore ? "#" : item.href}
      onClick={(e) => {
        if (isMore) {
          e.preventDefault();
          setMoreMenuOpen(true);
        }
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 py-2 font-mono text-[10px] uppercase tracking-wide",
        active ? "text-orange font-bold" : "text-ink/70"
      )}
    >
      <DoodleIcon name={item.icon} size={20} />
      {item.label}
    </Link>
  );
}
