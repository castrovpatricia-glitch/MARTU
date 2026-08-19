"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSettings } from "@/lib/hooks";
import { generateDueRecurring } from "@/lib/repo";
import { todayIso } from "@/lib/format";
import { isCloudEnabled, supabase } from "@/lib/supabase";
import { hasCloudData, pullFromCloud, pushToCloud } from "@/lib/sync";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import FabMenu from "./FabMenu";
import MoreMenu from "./MoreMenu";
import QuickAddRouter from "./QuickAddRouter";
import Toast from "@/components/ds/Toast";

const SYNC_INTERVAL_MS = 20_000;

export default function AppShell({ children }: { children: ReactNode }) {
  const settings = useSettings();
  const pathname = usePathname();
  const router = useRouter();
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);
  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);
  const setSyncing = useAuthStore((s) => s.setSyncing);
  const setLastSyncedAt = useAuthStore((s) => s.setLastSyncedAt);
  const pulledForUser = useRef<string | null>(null);

  // Auth subscription (no-op when cloud sync isn't configured).
  useEffect(() => {
    if (!isCloudEnabled || !supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, [setSession]);

  // Pull remote data down once per new sign-in.
  useEffect(() => {
    if (!isCloudEnabled || !session?.user) return;
    if (pulledForUser.current === session.user.id) return;
    pulledForUser.current = session.user.id;
    (async () => {
      const remoteExists = await hasCloudData(session.user.id);
      if (remoteExists) await pullFromCloud(session.user.id);
      else await pushToCloud(session.user.id);
    })();
  }, [session]);

  // Periodic + on-hide push while signed in.
  useEffect(() => {
    if (!isCloudEnabled || !session?.user) return;
    const userId = session.user.id;
    async function push() {
      setSyncing(true);
      await pushToCloud(userId);
      setSyncing(false);
      setLastSyncedAt(new Date().toISOString());
    }
    const interval = setInterval(push, SYNC_INTERVAL_MS);
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") push();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [session, setSyncing, setLastSyncedAt]);

  // Auth gate: only applies when cloud sync is configured.
  useEffect(() => {
    if (!isCloudEnabled || session === undefined) return;
    if (!session && pathname !== "/login") {
      router.replace("/login");
    } else if (session && pathname === "/login") {
      router.replace("/");
    }
  }, [session, pathname, router]);

  useEffect(() => {
    if (settings === undefined) return;
    const onboarded = settings?.onboarded;
    if (!onboarded && pathname !== "/onboarding" && pathname !== "/login") {
      router.replace("/onboarding");
    } else if (onboarded && pathname === "/onboarding") {
      router.replace("/");
    }
    if (onboarded) {
      generateDueRecurring(todayIso());
    }
  }, [settings, pathname, router]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
      if (e.key === "+" && !typing) {
        e.preventDefault();
        openQuickAdd("expense");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openQuickAdd]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (isCloudEnabled && session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-hand text-3xl animate-pulse">un segundo…</p>
      </div>
    );
  }

  if (isCloudEnabled && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-hand text-3xl animate-pulse">redirigiendo…</p>
      </div>
    );
  }

  if (pathname === "/onboarding") {
    return <>{children}</>;
  }

  if (settings === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-hand text-3xl animate-pulse">cargando tu plata…</p>
      </div>
    );
  }

  if (!settings?.onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-hand text-3xl animate-pulse">un segundo…</p>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col pb-20 md:pb-0">
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <BottomNav />
      <FabMenu />
      <MoreMenu />
      <QuickAddRouter />
      <Toast />
    </div>
  );
}
