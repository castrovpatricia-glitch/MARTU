import type { Category, CreditCard, Settings, Transaction } from "./types";
import { daysElapsedInMonth, daysRemainingInMonth, getMonthRange, parseIsoDate, shiftMonthId, weekIndexInMonth, weekStart } from "./date";

// All financial derivations live here so components never duplicate math.
// Everything is computed from the raw transaction list — nothing is cached
// or hardcoded.

export function txInMonth(transactions: Transaction[], monthId: string): Transaction[] {
  return transactions.filter((t) => t.date.startsWith(monthId));
}

export function txUpTo(transactions: Transaction[], dateIso: string): Transaction[] {
  return transactions.filter((t) => t.date <= dateIso);
}

export function sumExpenses(transactions: Transaction[]): number {
  return transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
}

export function sumIncome(transactions: Transaction[]): number {
  return transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
}

export function sumSavingsIn(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "saving" && t.direction === "in")
    .reduce((s, t) => s + t.amount, 0);
}

export function sumSavingsOut(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "saving" && t.direction === "out")
    .reduce((s, t) => s + t.amount, 0);
}

export function netSavingsMovement(transactions: Transaction[]): number {
  return sumSavingsIn(transactions) - sumSavingsOut(transactions);
}

/** "Plata actual": all disponible money, as of the latest recorded transaction. */
export function computeAvailableBalance(settings: Settings, allTransactions: Transaction[]): number {
  const income = sumIncome(allTransactions);
  const expense = sumExpenses(allTransactions);
  const savingsNet = netSavingsMovement(allTransactions);
  return settings.initialBalance + income - expense - savingsNet;
}

/** Total money parked in savings, all-time. */
export function computeTotalSavings(settings: Settings, allTransactions: Transaction[]): number {
  return settings.initialSavings + netSavingsMovement(allTransactions);
}

export interface MonthSummary {
  monthId: string;
  income: number;
  expense: number;
  savingsIn: number;
  savingsOut: number;
  netSavings: number;
  balance: number; // income - expense
  savingsRate: number; // netSavings / income * 100 (0 if no income)
  daysInMonth: number;
  daysElapsed: number;
  daysRemaining: number;
  avgDailySpend: number; // over elapsed days
  transactions: Transaction[];
}

export function computeMonthSummary(transactions: Transaction[], settings: Settings, monthId: string): MonthSummary {
  const monthTx = txInMonth(transactions, monthId);
  const range = getMonthRange(monthId);
  const income = sumIncome(monthTx);
  const expense = sumExpenses(monthTx);
  const savingsIn = sumSavingsIn(monthTx);
  const savingsOut = sumSavingsOut(monthTx);
  const netSavings = savingsIn - savingsOut;
  const daysElapsed = daysElapsedInMonth(monthId);
  const daysRemaining = daysRemainingInMonth(monthId);
  const avgDailySpend = daysElapsed > 0 ? expense / daysElapsed : 0;

  return {
    monthId,
    income,
    expense,
    savingsIn,
    savingsOut,
    netSavings,
    balance: income - expense,
    savingsRate: income > 0 ? (netSavings / income) * 100 : 0,
    daysInMonth: range.daysInMonth,
    daysElapsed,
    daysRemaining,
    avgDailySpend,
    transactions: monthTx,
  };
}

/** How much is left to spend this month without eating into the savings target. */
export function computeCanSpend(summary: MonthSummary, settings: Settings): number {
  const budgetable = summary.income - settings.monthlySavingsTarget;
  return budgetable - summary.expense;
}

/** Suggested spend per remaining day of the month. */
export function computeDailyBudget(summary: MonthSummary, settings: Settings): number {
  const remaining = computeCanSpend(summary, settings);
  const days = Math.max(summary.daysRemaining, 1);
  return remaining / days;
}

export interface CategoryStat {
  categoryId: string;
  category?: Category;
  total: number;
  count: number;
  percentOfTotal: number;
  budget?: number;
  budgetUsedPct?: number;
  remainingBudget?: number;
}

export function computeCategoryRanking(
  monthTx: Transaction[],
  categories: Category[],
  kind: "expense" | "income" = "expense"
): CategoryStat[] {
  const byId = new Map(categories.map((c) => [c.id, c]));
  const totals = new Map<string, { total: number; count: number }>();
  const relevant = monthTx.filter((t) => t.type === kind && t.categoryId);
  const grandTotal = relevant.reduce((s, t) => s + t.amount, 0);

  for (const t of relevant) {
    const key = t.categoryId!;
    const cur = totals.get(key) ?? { total: 0, count: 0 };
    cur.total += t.amount;
    cur.count += 1;
    totals.set(key, cur);
  }

  const stats: CategoryStat[] = Array.from(totals.entries()).map(([categoryId, v]) => {
    const category = byId.get(categoryId);
    const budget = category?.monthlyBudget;
    return {
      categoryId,
      category,
      total: v.total,
      count: v.count,
      percentOfTotal: grandTotal > 0 ? (v.total / grandTotal) * 100 : 0,
      budget,
      budgetUsedPct: budget ? (v.total / budget) * 100 : undefined,
      remainingBudget: budget ? budget - v.total : undefined,
    };
  });

  return stats.sort((a, b) => b.total - a.total);
}

export function biggestExpenseDay(monthTx: Transaction[]): { date: string; total: number } | undefined {
  const byDay = new Map<string, number>();
  for (const t of monthTx.filter((t) => t.type === "expense")) {
    byDay.set(t.date, (byDay.get(t.date) ?? 0) + t.amount);
  }
  let best: { date: string; total: number } | undefined;
  for (const [date, total] of byDay) {
    if (!best || total > best.total) best = { date, total };
  }
  return best;
}

export function biggestSingleExpense(monthTx: Transaction[]): Transaction | undefined {
  const expenses = monthTx.filter((t) => t.type === "expense");
  if (expenses.length === 0) return undefined;
  return expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);
}

export function percentChange(current: number, previous: number): number | undefined {
  if (previous === 0) return current === 0 ? 0 : undefined;
  return ((current - previous) / previous) * 100;
}

export interface CalendarDay {
  date: string;
  dayOfMonth: number;
  total: number;
  count: number;
}

export function computeCalendarData(monthId: string, transactions: Transaction[]): CalendarDay[] {
  const range = getMonthRange(monthId);
  const monthTx = txInMonth(transactions, monthId).filter((t) => t.type === "expense");
  const byDay = new Map<string, { total: number; count: number }>();
  for (const t of monthTx) {
    const cur = byDay.get(t.date) ?? { total: 0, count: 0 };
    cur.total += t.amount;
    cur.count += 1;
    byDay.set(t.date, cur);
  }
  const days: CalendarDay[] = [];
  for (let d = 1; d <= range.daysInMonth; d++) {
    const iso = `${monthId}-${String(d).padStart(2, "0")}`;
    const entry = byDay.get(iso);
    days.push({ date: iso, dayOfMonth: d, total: entry?.total ?? 0, count: entry?.count ?? 0 });
  }
  return days;
}

export interface WeekSummary {
  weekIndex: number;
  label: string;
  start: string;
  end: string;
  total: number;
  avgDaily: number;
  days: { dayOfWeek: number; date: string; total: number }[];
  vsLastWeekPct?: number;
}

export function computeCurrentWeekSummary(
  transactions: Transaction[],
  weekStartsOn: 0 | 1,
  reference: Date = new Date()
): WeekSummary {
  const start = weekStart(reference, weekStartsOn);
  const days: { dayOfWeek: number; date: string; total: number }[] = [];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const dayTotal = transactions
      .filter((t) => t.date === iso && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    total += dayTotal;
    days.push({ dayOfWeek: d.getDay(), date: iso, total: dayTotal });
  }
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const elapsedDays = days.filter((d) => parseIsoDate(d.date) <= reference).length || 1;

  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - 7);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevTotal = transactions
    .filter((t) => t.type === "expense" && parseIsoDate(t.date) >= prevStart && parseIsoDate(t.date) <= prevEnd)
    .reduce((s, t) => s + t.amount, 0);

  return {
    weekIndex: weekIndexInMonth(reference, weekStartsOn),
    label: `SEMANA ${weekIndexInMonth(reference, weekStartsOn)}`,
    start: days[0].date,
    end: `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`,
    total,
    avgDaily: total / elapsedDays,
    days,
    vsLastWeekPct: percentChange(total, prevTotal),
  };
}

/** Naive linear projection: keep spending at the current daily rate for the rest of the month. */
export function forecastMonthEnd(summary: MonthSummary): number {
  if (summary.daysElapsed === 0) return summary.expense;
  const rate = summary.expense / summary.daysElapsed;
  return rate * summary.daysInMonth;
}

export interface HealthCheck {
  savedPct: number;
  fixedPct: number;
  variablePct: number;
  availablePct: number;
}

export function computeHealthCheck(summary: MonthSummary, fixedExpenseTotal: number): HealthCheck {
  const income = summary.income || 1;
  const savedPct = (summary.netSavings / income) * 100;
  const fixedPct = (fixedExpenseTotal / income) * 100;
  const variableExpense = Math.max(summary.expense - fixedExpenseTotal, 0);
  const variablePct = (variableExpense / income) * 100;
  const availablePct = Math.max(100 - savedPct - fixedPct - variablePct, 0);
  return { savedPct, fixedPct, variablePct, availablePct };
}

export function computeFixedExpenseTotal(monthTx: Transaction[]): number {
  return monthTx.filter((t) => t.type === "expense" && t.recurringId).reduce((s, t) => s + t.amount, 0);
}

export function weekendVsWeekdayShare(monthTx: Transaction[]): number {
  const expenses = monthTx.filter((t) => t.type === "expense");
  const total = expenses.reduce((s, t) => s + t.amount, 0);
  if (total === 0) return 0;
  const weekend = expenses
    .filter((t) => {
      const day = parseIsoDate(t.date).getDay();
      return day === 0 || day === 6;
    })
    .reduce((s, t) => s + t.amount, 0);
  return (weekend / total) * 100;
}

export function spendByDayOfWeek(transactions: Transaction[]): { dayOfWeek: number; total: number; count: number }[] {
  const buckets = Array.from({ length: 7 }, (_, i) => ({ dayOfWeek: i, total: 0, count: 0 }));
  for (const t of transactions.filter((t) => t.type === "expense")) {
    const day = parseIsoDate(t.date).getDay();
    buckets[day].total += t.amount;
    buckets[day].count += 1;
  }
  return buckets;
}

// ---------- Credit cards ----------

export interface CardCycle {
  cycleStart: string;
  cycleEnd: string; // closing date (inclusive)
  dueDate: string;
}

/** Which billing cycle a purchase date falls in, given closing day. */
export function cycleForDate(dateIso: string, card: CreditCard): CardCycle {
  const d = parseIsoDate(dateIso);
  const year = d.getFullYear();
  const month = d.getMonth();
  const closingThisMonth = new Date(year, month, Math.min(card.closingDay, daysInMonthOf(year, month)));
  let cycleEndDate: Date;
  if (d <= closingThisMonth) {
    cycleEndDate = closingThisMonth;
  } else {
    cycleEndDate = new Date(year, month + 1, Math.min(card.closingDay, daysInMonthOf(year, month + 1)));
  }
  const cycleStartDate = new Date(cycleEndDate);
  cycleStartDate.setMonth(cycleStartDate.getMonth() - 1);
  cycleStartDate.setDate(cycleStartDate.getDate() + 1);
  const dueDate = new Date(cycleEndDate.getFullYear(), cycleEndDate.getMonth(), card.dueDay);
  if (dueDate < cycleEndDate) dueDate.setMonth(dueDate.getMonth() + 1);

  return {
    cycleStart: isoOf(cycleStartDate),
    cycleEnd: isoOf(cycleEndDate),
    dueDate: isoOf(dueDate),
  };
}

function daysInMonthOf(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function currentCardCycleTotal(card: CreditCard, transactions: Transaction[], reference = new Date()): {
  cycle: CardCycle;
  total: number;
  nextCycleTotal: number;
} {
  const refIso = isoOf(reference);
  const cycle = cycleForDate(refIso, card);
  const cardTx = transactions.filter((t) => t.isCreditCard && t.creditCardId === card.id && t.type === "expense");
  const total = cardTx
    .filter((t) => t.date >= cycle.cycleStart && t.date <= cycle.cycleEnd)
    .reduce((s, t) => s + t.amount, 0);
  const nextCycleStart = isoOf(addOneDay(parseIsoDate(cycle.cycleEnd)));
  const nextCycle = cycleForDate(nextCycleStart, card);
  const nextCycleTotal = cardTx
    .filter((t) => t.date >= nextCycle.cycleStart && t.date <= nextCycle.cycleEnd)
    .reduce((s, t) => s + t.amount, 0);
  return { cycle, total, nextCycleTotal };
}

function addOneDay(d: Date): Date {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + 1);
  return nd;
}

export { shiftMonthId };
