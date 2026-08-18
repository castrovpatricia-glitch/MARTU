"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSettings } from "@/lib/hooks";
import { generateDueRecurring } from "@/lib/repo";
import { todayIso } from "@/lib/format";
import { useUiStore } from "@/store/uiStore";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import FabMenu from "./FabMenu";
import MoreMenu from "./MoreMenu";
import QuickAddRouter from "./QuickAddRouter";
import Toast from "@/components/ds/Toast";

export default function AppShell({ children }: { children: ReactNode }) {
  const settings = useSettings();
  const pathname = usePathname();
  const router = useRouter();
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);

  useEffect(() => {
    if (settings === undefined) return;
    const onboarded = settings?.onboarded;
    if (!onboarded && pathname !== "/onboarding") {
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
