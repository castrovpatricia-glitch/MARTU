import type { DoodleIconName } from "@/lib/types";

export interface NavItem {
  href: string;
  label: string;
  icon: DoodleIconName;
}

export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/movimientos", label: "Movimientos", icon: "wallet" },
  { href: "/mes", label: "Mes", icon: "target" },
  { href: "/presupuestos", label: "Presupuestos", icon: "piggy" },
  { href: "/ahorros", label: "Ahorros", icon: "coin" },
  { href: "/metas", label: "Metas", icon: "star" },
  { href: "/fijos", label: "Fijos", icon: "repeat" },
  { href: "/historial", label: "Historial", icon: "book" },
  { href: "/ajustes", label: "Ajustes", icon: "dots" },
];

export const MOBILE_MAIN_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/movimientos", label: "Movimientos", icon: "wallet" },
  { href: "/mes", label: "Mes", icon: "target" },
];

export const MOBILE_MORE_NAV: NavItem[] = [
  { href: "/presupuestos", label: "Presupuestos", icon: "piggy" },
  { href: "/ahorros", label: "Ahorros", icon: "coin" },
  { href: "/metas", label: "Metas", icon: "star" },
  { href: "/fijos", label: "Fijos", icon: "repeat" },
  { href: "/suscripciones", label: "Suscripciones", icon: "repeat" },
  { href: "/tarjetas", label: "Tarjetas", icon: "card" },
  { href: "/historial", label: "Historial", icon: "book" },
  { href: "/ajustes", label: "Ajustes", icon: "dots" },
];
