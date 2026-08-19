"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import DoodleIcon from "@/components/doodles/DoodleIcon";

export default function Toast() {
  const toast = useUiStore((s) => s.toast);
  const dismissToast = useUiStore((s) => s.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 4500);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-20 sm:bottom-6 z-[60] w-[92%] sm:w-auto animate-toast-in">
      <div className="bg-ink text-paper rounded-full shadow-hard-lg pl-4 pr-2 py-2 flex items-center gap-3 font-mono text-sm">
        <DoodleIcon name="check" className="shrink-0" />
        <span className="flex-1">{toast.message}</span>
        {toast.onUndo && (
          <button
            onClick={() => {
              toast.onUndo?.();
              dismissToast();
            }}
            className="font-bold rounded-full bg-white/10 px-3 py-1.5 shrink-0"
          >
            Deshacer
          </button>
        )}
        <button onClick={dismissToast} aria-label="Cerrar" className="shrink-0 opacity-70">
          ✕
        </button>
      </div>
    </div>
  );
}
