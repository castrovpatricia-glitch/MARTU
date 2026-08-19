import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  color?: "ink" | "orange" | "lime" | "cream" | "pink" | "yellow";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  children?: ReactNode;
}

const COLOR_SOLID: Record<NonNullable<Props["color"]>, string> = {
  ink: "bg-ink text-paper",
  orange: "bg-orange text-white",
  lime: "bg-lime text-ink",
  cream: "bg-cream text-ink",
  pink: "bg-pink text-ink",
  yellow: "bg-yellow text-ink",
};

const SIZE_CLASS: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

export default function Button({
  variant = "solid",
  color = "ink",
  size = "md",
  full,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        "font-sans font-bold rounded-full press-down inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "solid" && "shadow-hard-sm " + COLOR_SOLID[color],
        variant === "outline" && "bg-white text-ink border border-ink/10 shadow-hard-sm",
        variant === "ghost" && "bg-transparent text-ink shadow-none",
        SIZE_CLASS[size],
        full && "w-full",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
