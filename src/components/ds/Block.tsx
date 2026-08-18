import type { ElementType, ReactNode } from "react";
import type { PaletteColor } from "@/lib/types";
import { PALETTE_BG, PALETTE_TEXT } from "./palette";
import { cn } from "@/lib/cn";

interface BlockProps {
  as?: ElementType;
  color?: PaletteColor;
  className?: string;
  children?: ReactNode;
  shadow?: "sm" | "md" | "lg" | "none";
  padded?: boolean;
  texture?: boolean;
  onClick?: () => void;
}

const SHADOW_CLASS: Record<NonNullable<BlockProps["shadow"]>, string> = {
  none: "",
  sm: "shadow-hard-sm",
  md: "shadow-hard",
  lg: "shadow-hard-lg",
};

export default function Block({
  as: Tag = "div",
  color = "white",
  className,
  children,
  shadow = "md",
  padded = true,
  texture = true,
  onClick,
}: BlockProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "border-2 border-ink relative",
        texture && "paper-texture",
        PALETTE_BG[color],
        PALETTE_TEXT[color],
        SHADOW_CLASS[shadow],
        padded && "p-4 sm:p-5",
        onClick && "cursor-pointer press-down",
        className
      )}
    >
      {children}
    </Tag>
  );
}
