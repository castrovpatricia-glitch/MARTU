"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

/** `undefined` = still loading, `null` = confirmed no settings row yet (fresh install). */
export function useSettings() {
  return useLiveQuery(() => db.settings.get("settings").then((s) => s ?? null), []);
}

export function useTransactions() {
  return useLiveQuery(() => db.transactions.orderBy("date").reverse().toArray(), []) ?? [];
}

export function useCategories() {
  return useLiveQuery(() => db.categories.orderBy("order").toArray(), []) ?? [];
}

export function useActiveCategories() {
  const categories = useCategories();
  return categories.filter((c) => !c.archived);
}

export function useAccounts() {
  return useLiveQuery(() => db.accounts.toArray(), []) ?? [];
}

export function useCreditCards() {
  return useLiveQuery(() => db.creditCards.toArray(), []) ?? [];
}

export function useRecurring() {
  return useLiveQuery(() => db.recurring.toArray(), []) ?? [];
}

export function useSavingsGoals() {
  return useLiveQuery(() => db.savingsGoals.toArray(), []) ?? [];
}

export function useMonths() {
  return useLiveQuery(() => db.months.orderBy("id").toArray(), []) ?? [];
}
