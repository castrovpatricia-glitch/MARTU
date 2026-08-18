import { create } from "zustand";
import { monthIdOf } from "@/lib/date";

export type QuickAddKind = "expense" | "income" | "transfer" | "saving" | null;

interface ToastState {
  id: string;
  message: string;
  onUndo?: () => void;
}

interface UiState {
  selectedMonthId: string;
  setSelectedMonthId: (id: string) => void;

  quickAddKind: QuickAddKind;
  quickAddEditId: string | null;
  openQuickAdd: (kind: QuickAddKind, editId?: string) => void;
  closeQuickAdd: () => void;

  fabMenuOpen: boolean;
  setFabMenuOpen: (open: boolean) => void;

  moreMenuOpen: boolean;
  setMoreMenuOpen: (open: boolean) => void;

  toast: ToastState | null;
  showToast: (message: string, onUndo?: () => void) => void;
  dismissToast: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedMonthId: monthIdOf(new Date()),
  setSelectedMonthId: (id) => set({ selectedMonthId: id }),

  quickAddKind: null,
  quickAddEditId: null,
  openQuickAdd: (kind, editId) => set({ quickAddKind: kind, quickAddEditId: editId ?? null, fabMenuOpen: false }),
  closeQuickAdd: () => set({ quickAddKind: null, quickAddEditId: null }),

  fabMenuOpen: false,
  setFabMenuOpen: (open) => set({ fabMenuOpen: open }),

  moreMenuOpen: false,
  setMoreMenuOpen: (open) => set({ moreMenuOpen: open }),

  toast: null,
  showToast: (message, onUndo) => set({ toast: { id: `${Date.now()}`, message, onUndo } }),
  dismissToast: () => set({ toast: null }),
}));
