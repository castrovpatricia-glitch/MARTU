import Dexie, { type EntityTable } from "dexie";
import type {
  Account,
  Category,
  CreditCard,
  Investment,
  InvestmentMovement,
  MonthRecord,
  RecurringTransaction,
  SavingsGoal,
  Settings,
  Transaction,
} from "./types";

// Local-first persistence via IndexedDB. Kept as a thin, swappable layer:
// `repo.ts` is the only module that talks to `db` directly, so a future
// Supabase-backed implementation of the same repo functions can replace it
// without touching calculations or UI.
class MartuDB extends Dexie {
  transactions!: EntityTable<Transaction, "id">;
  categories!: EntityTable<Category, "id">;
  accounts!: EntityTable<Account, "id">;
  creditCards!: EntityTable<CreditCard, "id">;
  recurring!: EntityTable<RecurringTransaction, "id">;
  savingsGoals!: EntityTable<SavingsGoal, "id">;
  months!: EntityTable<MonthRecord, "id">;
  settings!: EntityTable<Settings, "id">;
  investments!: EntityTable<Investment, "id">;
  investmentMovements!: EntityTable<InvestmentMovement, "id">;

  constructor() {
    super("martu-db");
    this.version(1).stores({
      transactions: "id, type, date, categoryId, accountId, creditCardId, recurringId",
      categories: "id, order",
      accounts: "id",
      creditCards: "id",
      recurring: "id, nextDate",
      savingsGoals: "id",
      months: "id",
      settings: "id",
    });
    this.version(2).stores({
      investments: "id",
      investmentMovements: "id, investmentId, date",
    });
  }
}

export const db = new MartuDB();
