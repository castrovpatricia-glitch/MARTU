import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null | undefined; // undefined = still loading, null = signed out
  setSession: (session: Session | null) => void;
  syncing: boolean;
  setSyncing: (v: boolean) => void;
  lastSyncedAt: string | null;
  setLastSyncedAt: (v: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: undefined,
  setSession: (session) => set({ session }),
  syncing: false,
  setSyncing: (v) => set({ syncing: v }),
  lastSyncedAt: null,
  setLastSyncedAt: (v) => set({ lastSyncedAt: v }),
}));
