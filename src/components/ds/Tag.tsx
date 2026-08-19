import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PaletteColor } from "@/lib/types";
import { PALETTE_BG, PALETTE_TEXT } from "./palette";

export default function Tag({
  children,
  color = "cream",
  className,
  onClick,
}: {
  children: ReactNode;
  color?: PaletteColor;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wide",
        PALETTE_BG[color],
        PALETTE_TEXT[color],
        onClick && "press-down shadow-hard-sm",
        className
      )}
    >
      {children}
    </Comp>
  );
}
