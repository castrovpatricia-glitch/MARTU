import { db } from "./db";
import { newId, nowIso } from "./id";
import { buildDefaultCategories } from "./defaultCategories";
import { monthIdOf } from "./date";
import type {
  Account,
  Category,
  CreditCard,
  Investment,
  InvestmentMovement,
  RecurringTransaction,
  SavingsGoal,
  Settings,
  Transaction,
} from "./types";

// Data-access layer. UI and calculation code should only ever go through
// these functions (never `db` directly) so persistence can later be swapped
// for a Supabase-backed implementation without touching callers.

export const SETTINGS_ID = "settings" as const;

export async function getSettings(): Promise<Settings | undefined> {
  return db.settings.get(SETTINGS_ID);
}

export async function saveSettings(settings: Settings): Promise<void> {
  await db.settings.put(settings);
}

export async function updateSettings(patch: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  if (!current) return;
  await db.settings.put({ ...current, ...patch });
}

export async function completeOnboarding(input: {
  currency: string;
  locale: string;
  initialBalance: number;
  initialSavings: number;
  monthlyIncomeEstimate: number;
  payday: number;
  mainGoal: Settings["mainGoal"];
  monthlySavingsTarget: number;
  isDemo: boolean;
}): Promise<void> {
  const settings: Settings = {
    id: SETTINGS_ID,
    currency: input.currency,
    locale: input.locale,
    weekStartsOn: 1,
    payday: input.payday,
    mainGoal: input.mainGoal,
    monthlySavingsTarget: input.monthlySavingsTarget,
    initialBalance: input.initialBalance,
    initialSavings: input.initialSavings,
    monthlyIncomeEstimate: input.monthlyIncomeEstimate,
    onboarded: true,
    isDemo: input.isDemo,
    numberDisplayMode: "full",
    createdAt: nowIso(),
  };
  await db.settings.put(settings);
  const existingCats = await db.categories.count();
  if (existingCats === 0) {
    await db.categories.bulkAdd(buildDefaultCategories());
  }
  const monthId = currentMonthId();
  const existingMonth = await db.months.get(monthId);
  if (!existingMonth) {
    await db.months.add({ id: monthId, closed: false });
  }
}

export function currentMonthId(date: Date = new Date()): string {
  return monthIdOf(date);
}

// ---------- Transactions ----------

export async function listTransactions(): Promise<Transaction[]> {
  return db.transactions.orderBy("date").reverse().toArray();
}

export async function addTransaction(
  data: Omit<Transaction, "id" | "createdAt" | "updatedAt">
): Promise<Transaction> {
  const tx: Transaction = {
    ...data,
    id: newId(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  await db.transactions.add(tx);
  await ensureMonthExists(tx.date);
  return tx;
}

export async function updateTransaction(
  id: string,
  patch: Partial<Transaction>
): Promise<void> {
  await db.transactions.update(id, { ...patch, updatedAt: nowIso() });
}

export async function deleteTransaction(id: string): Promise<void> {
  await db.transactions.delete(id);
}

export async function duplicateTransaction(id: string): Promise<Transaction | undefined> {
  const original = await db.transactions.get(id);
  if (!original) return undefined;
  const rest = { ...original };
  delete (rest as Partial<Transaction>).id;
  delete (rest as Partial<Transaction>).createdAt;
  delete (rest as Partial<Transaction>).updatedAt;
  return addTransaction(rest);
}

async function ensureMonthExists(dateIso: string): Promise<void> {
  const monthId = dateIso.slice(0, 7);
  const existing = await db.months.get(monthId);
  if (!existing) {
    await db.months.add({ id: monthId, closed: false });
  }
}

// ---------- Categories ----------

export async function listCategories(): Promise<Category[]> {
  return db.categories.orderBy("order").toArray();
}

export async function addCategory(data: Omit<Category, "id" | "createdAt">): Promise<Category> {
  const cat: Category = { ...data, id: newId(), createdAt: nowIso() };
  await db.categories.add(cat);
  return cat;
}

export async function updateCategory(id: string, patch: Partial<Category>): Promise<void> {
  await db.categories.update(id, patch);
}

export async function deleteCategory(id: string): Promise<void> {
  await db.categories.update(id, { archived: true });
}

export async function reorderCategories(orderedIds: string[]): Promise<void> {
  await Promise.all(orderedIds.map((id, i) => db.categories.update(id, { order: i })));
}

// ---------- Accounts ----------

export async function listAccounts(): Promise<Account[]> {
  return db.accounts.toArray();
}

export async function addAccount(data: Omit<Account, "id" | "createdAt">): Promise<Account> {
  const acc: Account = { ...data, id: newId(), createdAt: nowIso() };
  await db.accounts.add(acc);
  return acc;
}

export async function updateAccount(id: string, patch: Partial<Account>): Promise<void> {
  await db.accounts.update(id, patch);
}

export async function deleteAccount(id: string): Promise<void> {
  await db.accounts.update(id, { archived: true });
}

// ---------- Credit cards ----------

export async function listCreditCards(): Promise<CreditCard[]> {
  return db.creditCards.toArray();
}

export async function addCreditCard(data: Omit<CreditCard, "id" | "createdAt">): Promise<CreditCard> {
  const card: CreditCard = { ...data, id: newId(), createdAt: nowIso() };
  await db.creditCards.add(card);
  return card;
}

export async function updateCreditCard(id: string, patch: Partial<CreditCard>): Promise<void> {
  await db.creditCards.update(id, patch);
}

export async function deleteCreditCard(id: string): Promise<void> {
  await db.creditCards.update(id, { archived: true });
}

// ---------- Recurring ----------

export async function listRecurring(): Promise<RecurringTransaction[]> {
  return db.recurring.toArray();
}

export async function addRecurring(
  data: Omit<RecurringTransaction, "id" | "createdAt">
): Promise<RecurringTransaction> {
  const rec: RecurringTransaction = { ...data, id: newId(), createdAt: nowIso() };
  await db.recurring.add(rec);
  return rec;
}

export async function updateRecurring(id: string, patch: Partial<RecurringTransaction>): Promise<void> {
  await db.recurring.update(id, patch);
}

export async function deleteRecurring(id: string): Promise<void> {
  await db.recurring.delete(id);
}

/** Posts a transaction for every active recurring item whose next date has
 * arrived, then advances its schedule. Safe to call often (e.g. on app
 * load) — it never double-posts because nextDate always moves forward. */
export async function generateDueRecurring(referenceDateIso: string): Promise<number> {
  const items = await db.recurring.toArray();
  let created = 0;
  for (const item of items) {
    if (!item.active) continue;
    let nextDate = item.nextDate;
    while (nextDate <= referenceDateIso) {
      await db.transactions.add({
        id: newId(),
        type: item.type,
        amount: item.amount,
        categoryId: item.categoryId,
        date: nextDate,
        description: item.description,
        paymentMethod: item.paymentMethod,
        accountId: item.accountId,
        recurringId: item.id,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      });
      await ensureMonthExists(nextDate);
      created += 1;
      nextDate = advanceDate(nextDate, item.frequency, item.customDays);
    }
    if (nextDate !== item.nextDate) {
      await db.recurring.update(item.id, { nextDate });
    }
  }
  return created;
}

export function advanceDate(dateIso: string, frequency: RecurringTransaction["frequency"], customDays?: number): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (frequency === "weekly") date.setDate(date.getDate() + 7);
  else if (frequency === "monthly") date.setMonth(date.getMonth() + 1);
  else if (frequency === "yearly") date.setFullYear(date.getFullYear() + 1);
  else date.setDate(date.getDate() + (customDays ?? 30));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// ---------- Savings goals ----------

export async function listSavingsGoals(): Promise<SavingsGoal[]> {
  return db.savingsGoals.toArray();
}

export async function addSavingsGoal(
  data: Omit<SavingsGoal, "id" | "createdAt">
): Promise<SavingsGoal> {
  const goal: SavingsGoal = { ...data, id: newId(), createdAt: nowIso() };
  await db.savingsGoals.add(goal);
  return goal;
}

export async function updateSavingsGoal(id: string, patch: Partial<SavingsGoal>): Promise<void> {
  await db.savingsGoals.update(id, patch);
}

export async function deleteSavingsGoal(id: string): Promise<void> {
  await db.savingsGoals.update(id, { archived: true });
}

// ---------- Investments ----------

export async function listInvestments(): Promise<Investment[]> {
  return db.investments.toArray();
}

export async function addInvestment(data: Omit<Investment, "id" | "createdAt">): Promise<Investment> {
  const inv: Investment = { ...data, id: newId(), createdAt: nowIso() };
  await db.investments.add(inv);
  return inv;
}

export async function updateInvestment(id: string, patch: Partial<Investment>): Promise<void> {
  await db.investments.update(id, patch);
}

export async function deleteInvestment(id: string): Promise<void> {
  await db.investments.update(id, { archived: true });
}

export async function listInvestmentMovements(): Promise<InvestmentMovement[]> {
  return db.investmentMovements.orderBy("date").reverse().toArray();
}

export async function addInvestmentMovement(
  data: Omit<InvestmentMovement, "id" | "createdAt">
): Promise<InvestmentMovement> {
  const mv: InvestmentMovement = { ...data, id: newId(), createdAt: nowIso() };
  await db.investmentMovements.add(mv);
  return mv;
}

export async function deleteInvestmentMovement(id: string): Promise<void> {
  await db.investmentMovements.delete(id);
}

// ---------- Months ----------

export async function listMonths(): Promise<{ id: string; closed: boolean; closedAt?: string }[]> {
  return db.months.orderBy("id").toArray();
}

export async function closeMonth(monthId: string): Promise<void> {
  await db.months.put({ id: monthId, closed: true, closedAt: nowIso() });
  const [y, m] = monthId.split("-").map(Number);
  const nextDate = new Date(y, m, 1);
  const nextId = currentMonthId(nextDate);
  const existing = await db.months.get(nextId);
  if (!existing) {
    await db.months.add({ id: nextId, closed: false });
  }
}

export async function ensureMonth(monthId: string): Promise<void> {
  const existing = await db.months.get(monthId);
  if (!existing) {
    await db.months.add({ id: monthId, closed: false });
  }
}

// ---------- Danger zone ----------

export async function resetAllData(): Promise<void> {
  await db.transaction(
    "rw",
    [
      db.transactions,
      db.categories,
      db.accounts,
      db.creditCards,
      db.recurring,
      db.savingsGoals,
      db.months,
      db.settings,
      db.investments,
      db.investmentMovements,
    ],
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
        db.investments.clear(),
        db.investmentMovements.clear(),
      ]);
    }
  );
}
