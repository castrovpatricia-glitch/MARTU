"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

// Bottom sheet on mobile, centered card on desktop. Used for all quick-add
// and edit forms so the interaction stays consistent everywhere.
export default function Sheet({
  open,
  onClose,
  title,
  children,
  color = "bg-cream",
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  color?: string;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div
        className={cn(
          "relative w-full sm:max-w-md border-2 border-ink shadow-hard-lg max-h-[92vh] overflow-y-auto animate-pop-in",
          wide && "sm:max-w-2xl",
          color
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-ink bg-inherit px-4 sm:px-6 py-3.5 z-10">
          <h2 className="font-display text-xl sm:text-2xl">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 border-2 border-ink bg-white text-ink flex items-center justify-center press-down shadow-hard-sm shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>
        <div className="px-4 sm:px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
