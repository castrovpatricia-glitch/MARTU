import type { PaletteColor } from "@/lib/types";

// Literal class strings (never templated) so Tailwind's scanner picks them up.
export const PALETTE_BG: Record<PaletteColor, string> = {
  cream: "bg-cream",
  orange: "bg-orange",
  lime: "bg-lime",
  mint: "bg-mint",
  pink: "bg-pink",
  yellow: "bg-yellow",
  blue: "bg-blue",
  white: "bg-white",
};

export const PALETTE_TEXT: Record<PaletteColor, string> = {
  cream: "text-ink",
  orange: "text-white",
  lime: "text-ink",
  mint: "text-ink",
  pink: "text-ink",
  yellow: "text-ink",
  blue: "text-ink",
  white: "text-ink",
};

export const PALETTE_HEX: Record<PaletteColor, string> = {
  cream: "#f3ecdc",
  orange: "#f2551c",
  lime: "#cdea3d",
  mint: "#a8e6c9",
  pink: "#f6a3c1",
  yellow: "#ffcf3f",
  blue: "#a9c9f5",
  white: "#fffaf0",
};

export const PALETTE_COLORS: PaletteColor[] = ["cream", "orange", "lime", "mint", "pink", "yellow", "blue", "white"];
