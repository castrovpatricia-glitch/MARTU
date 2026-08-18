import { db } from "./db";
import { newId, nowIso } from "./id";
import { buildDefaultCategories } from "./defaultCategories";
import { monthIdOf, shiftMonthId, getMonthRange } from "./date";
import type { Category, CreditCard, RecurringTransaction, SavingsGoal, Settings, Transaction } from "./types";

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}
function iso(y: number, m0: number, d: number): string {
  return `${y}-${String(m0 + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Populates the DB with a rich, self-consistent fictional dataset. Never
 * mixes with real data — call only against a freshly reset database. */
export async function loadDemoData(): Promise<void> {
  const now = new Date();
  const currency = "ARS";
  const locale = "es-AR";

  const categories = buildDefaultCategories();
  const byName = (n: string) => categories.find((c) => c.name === n)!;
  byName("Restaurantes / Salidas").monthlyBudget = 15_000_00;
  byName("Comida").monthlyBudget = 12_000_00;
  byName("Ropa").monthlyBudget = 6_000_00;
  byName("Transporte").monthlyBudget = 8_000_00;
  byName("Suscripciones").monthlyBudget = 5_000_00;

  const account = {
    id: newId(),
    name: "Cuenta principal",
    kind: "banco" as const,
    color: "mint" as const,
    initialBalance: 0,
    createdAt: nowIso(),
  };

  const card: CreditCard = {
    id: newId(),
    name: "Visa Signature",
    closingDay: 22,
    dueDay: 5,
    color: "orange",
    createdAt: nowIso(),
  };

  const goal: SavingsGoal = {
    id: newId(),
    name: "Viaje a Japón",
    targetAmount: 4_000_00,
    currency: "USD",
    savedAmount: 1_580_00,
    targetDate: iso(now.getFullYear() + 1, 3, 1),
    color: "blue",
    createdAt: nowIso(),
  };

  const settings: Settings = {
    id: "settings",
    currency,
    locale,
    weekStartsOn: 1,
    payday: 1,
    mainGoal: "ambas",
    monthlySavingsTarget: 200_000_00,
    initialBalance: 950_000_00,
    initialSavings: 2_570_000_00,
    monthlyIncomeEstimate: 1_650_000_00,
    onboarded: true,
    isDemo: true,
    numberDisplayMode: "full",
    createdAt: nowIso(),
  };

  const transactions: Transaction[] = [];
  const recurring: RecurringTransaction[] = [];

  const netflix = byName("Suscripciones");
  const spotify = byName("Suscripciones");
  const gym = byName("Salud");
  const rent = byName("Casa");

  const sueldoCategory = categories.find((c) => c.name === "Sueldo")!;

  const recNetflix = mkRecurring("expense", 8_999_00, netflix, "Netflix", "monthly", now);
  const recSpotify = mkRecurring("expense", 3_499_00, spotify, "Spotify", "monthly", now);
  const recGym = mkRecurring("expense", 42_000_00, gym, "Gimnasio", "monthly", now);
  const recRent = mkRecurring("expense", 420_000_00, rent, "Alquiler", "monthly", now);
  const recSalary = mkRecurring("income", 1_650_000_00, sueldoCategory, "Sueldo", "monthly", now);

  recurring.push(recSalary, recNetflix, recSpotify, recGym, recRent);

  const expenseCats = categories.filter((c) => !c.isIncome && c.name !== "Casa");
  const incomeCat = categories.find((c) => c.name === "Sueldo")!;
  const freelanceCat = categories.find((c) => c.name === "Freelance")!;

  // last 4 full months + current month to date
  for (let back = 4; back >= 0; back--) {
    const monthId = shiftMonthId(monthIdOf(now), -back);
    const range = getMonthRange(monthId);
    const isCurrent = back === 0;
    const lastDay = isCurrent ? now.getDate() : range.daysInMonth;
    const [y, m] = monthId.split("-").map(Number);

    // income
    transactions.push(
      mkTx("income", 1_650_000_00 + rand(-30, 30) * 1000, incomeCat.id, iso(y, m - 1, 1), "Sueldo", "transferencia", undefined, recSalary.id)
    );
    if (Math.random() > 0.4) {
      transactions.push(
        mkTx("income", rand(40_000, 180_000) * 100, freelanceCat.id, iso(y, m - 1, rand(5, 20)), "Freelance")
      );
    }

    // fixed
    transactions.push(mkTx("expense", 420_000_00, rent.id, iso(y, m - 1, 5), "Alquiler", "transferencia", undefined, recRent.id));
    transactions.push(mkTx("expense", 8_999_00, netflix.id, iso(y, m - 1, 20), "Netflix", "debito", undefined, recNetflix.id));
    transactions.push(mkTx("expense", 3_499_00, spotify.id, iso(y, m - 1, 12), "Spotify", "debito", undefined, recSpotify.id));
    transactions.push(mkTx("expense", 42_000_00, gym.id, iso(y, m - 1, 24), "Gimnasio", "debito", undefined, recGym.id));

    // variable, roughly one every 1-2 days
    for (let d = 1; d <= lastDay; d++) {
      if (Math.random() > 0.55) continue;
      const dayTxCount = Math.random() > 0.85 ? 2 : 1;
      for (let n = 0; n < dayTxCount; n++) {
        const cat = pick(expenseCats);
        const isCard = Math.random() > 0.6;
        transactions.push(
          mkTx(
            "expense",
            amountFor(cat.name),
            cat.id,
            iso(y, m - 1, d),
            descriptionFor(cat.name),
            isCard ? "credito" : pick(["debito", "efectivo", "transferencia"] as const),
            isCard ? card.id : undefined
          )
        );
      }
    }

    // savings movement
    if (Math.random() > 0.2) {
      transactions.push(mkSaving(rand(80_000, 260_000) * 100, iso(y, m - 1, rand(25, lastDay > 25 ? lastDay : 28)), goal.id));
    }
  }

  await db.transaction(
    "rw",
    [db.settings, db.categories, db.accounts, db.creditCards, db.recurring, db.savingsGoals, db.transactions, db.months],
    async () => {
      await db.settings.put(settings);
      await db.categories.bulkAdd(categories);
      await db.accounts.add(account);
      await db.creditCards.add(card);
      await db.recurring.bulkAdd(recurring);
      await db.savingsGoals.add(goal);
      await db.transactions.bulkAdd(transactions);
      await db.months.add({ id: monthIdOf(now), closed: false });
    }
  );
}

function amountFor(categoryName: string): number {
  const table: Record<string, [number, number]> = {
    Comida: [2000, 9000],
    "Restaurantes / Salidas": [4000, 25000],
    Supermercado: [8000, 45000],
    Transporte: [800, 4000],
    "Uber / Taxi": [2000, 12000],
    Ropa: [6000, 60000],
    Shopping: [3000, 40000],
    Belleza: [3000, 25000],
    Salud: [2000, 30000],
    Entretenimiento: [3000, 20000],
    Viajes: [10000, 120000],
    Regalos: [3000, 30000],
    Educación: [5000, 40000],
    Trabajo: [1000, 15000],
    Otros: [1000, 10000],
  };
  const [min, max] = table[categoryName] ?? [1000, 10000];
  return rand(min, max) * 100;
}

function descriptionFor(categoryName: string): string {
  const table: Record<string, string[]> = {
    Comida: ["Almuerzo", "Panadería", "Delivery"],
    "Restaurantes / Salidas": ["Cena afuera", "Bar", "Brunch"],
    Supermercado: ["Coto", "Carrefour", "Día"],
    Transporte: ["SUBE", "Nafta"],
    "Uber / Taxi": ["Uber", "Cabify"],
    Ropa: ["Zapatillas", "Remera", "Campera"],
    Shopping: ["Compra online", "Regalo para mí"],
    Belleza: ["Peluquería", "Skincare"],
    Salud: ["Farmacia", "Consulta médica"],
    Entretenimiento: ["Cine", "Streaming", "Recital"],
    Viajes: ["Pasajes", "Hotel"],
    Regalos: ["Cumpleaños amigo/a", "Regalo familia"],
    Educación: ["Curso online", "Libros"],
    Trabajo: ["Insumos", "Coworking"],
    Otros: ["Varios"],
  };
  const opts = table[categoryName] ?? ["Gasto"];
  return pick(opts);
}

function mkTx(
  type: Transaction["type"],
  amount: number,
  categoryId: string,
  date: string,
  description: string,
  paymentMethod?: Transaction["paymentMethod"],
  creditCardId?: string,
  recurringId?: string
): Transaction {
  return {
    id: newId(),
    type,
    amount,
    categoryId,
    date,
    description,
    paymentMethod: paymentMethod ?? (type === "income" ? "transferencia" : "debito"),
    isCreditCard: Boolean(creditCardId),
    creditCardId,
    recurringId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

function mkSaving(amount: number, date: string, goalId: string): Transaction {
  return {
    id: newId(),
    type: "saving",
    amount,
    date,
    direction: "in",
    savingsGoalId: goalId,
    description: "Ahorro del mes",
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

function mkRecurring(
  type: "income" | "expense",
  amount: number,
  category: Category,
  description: string,
  frequency: RecurringTransaction["frequency"],
  now: Date
): RecurringTransaction {
  return {
    id: newId(),
    type,
    amount,
    categoryId: category.id,
    description,
    frequency,
    startDate: iso(now.getFullYear(), now.getMonth(), 1),
    nextDate: iso(now.getFullYear(), now.getMonth() + 1, 1),
    isSubscription: description === "Netflix" || description === "Spotify" || description === "Gimnasio",
    active: true,
    createdAt: nowIso(),
  };
}
