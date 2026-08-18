import { db } from "./db";
import { CURRENT_SCHEMA_VERSION } from "./types";
import { formatMoney } from "./format";
import type { Account, Category, CreditCard, MonthRecord, RecurringTransaction, SavingsGoal, Settings, Transaction } from "./types";

export interface FullBackup {
  version: number;
  exportedAt: string;
  settings?: Settings;
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  creditCards: CreditCard[];
  recurring: RecurringTransaction[];
  savingsGoals: SavingsGoal[];
  months: MonthRecord[];
}

export async function buildFullBackup(): Promise<FullBackup> {
  const [settings, transactions, categories, accounts, creditCards, recurring, savingsGoals, months] =
    await Promise.all([
      db.settings.get("settings"),
      db.transactions.toArray(),
      db.categories.toArray(),
      db.accounts.toArray(),
      db.creditCards.toArray(),
      db.recurring.toArray(),
      db.savingsGoals.toArray(),
      db.months.toArray(),
    ]);
  return {
    version: CURRENT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    settings,
    transactions,
    categories,
    accounts,
    creditCards,
    recurring,
    savingsGoals,
    months,
  };
}

export function downloadJson(backup: FullBackup, filename = "martu-backup.json") {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  triggerDownload(blob, filename);
}

export async function restoreFromBackup(backup: FullBackup): Promise<void> {
  await db.transaction(
    "rw",
    [db.transactions, db.categories, db.accounts, db.creditCards, db.recurring, db.savingsGoals, db.months, db.settings],
    async () => {
      await Promise.all([
        db.transactions.clear(),
        db.categories.clear(),
        db.accounts.clear(),
        db.creditCards.clear(),
        db.recurring.clear(),
        db.savingsGoals.clear(),
        db.months.clear(),
        db.settings.clear(),
      ]);
      if (backup.settings) await db.settings.put(backup.settings);
      if (backup.transactions?.length) await db.transactions.bulkAdd(backup.transactions);
      if (backup.categories?.length) await db.categories.bulkAdd(backup.categories);
      if (backup.accounts?.length) await db.accounts.bulkAdd(backup.accounts);
      if (backup.creditCards?.length) await db.creditCards.bulkAdd(backup.creditCards);
      if (backup.recurring?.length) await db.recurring.bulkAdd(backup.recurring);
      if (backup.savingsGoals?.length) await db.savingsGoals.bulkAdd(backup.savingsGoals);
      if (backup.months?.length) await db.months.bulkAdd(backup.months);
    }
  );
}

export function exportTransactionsCsv(
  transactions: Transaction[],
  categories: Category[],
  currency: string,
  locale: string
) {
  const catName = new Map(categories.map((c) => [c.id, c.name]));
  const header = ["fecha", "tipo", "categoria", "descripcion", "monto", "medio_pago", "etiquetas"];
  const rows = transactions.map((t) => [
    t.date,
    t.type,
    t.categoryId ? catName.get(t.categoryId) ?? "" : "",
    (t.description ?? "").replace(/"/g, '""'),
    formatMoney(t.amount, currency, locale).replace(/"/g, '""'),
    t.paymentMethod ?? "",
    (t.tags ?? []).join("; "),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, "martu-movimientos.csv");
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
