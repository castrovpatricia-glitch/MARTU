// Core data model for MARTU. All monetary amounts are stored as integers in
// the currency's minor unit (e.g. cents) to avoid floating point drift.

export type ID = string;

export type PaletteColor =
  | "cream"
  | "orange"
  | "lime"
  | "mint"
  | "pink"
  | "yellow"
  | "blue"
  | "white";

export type PaymentMethod =
  | "debito"
  | "credito"
  | "efectivo"
  | "transferencia"
  | "otro";

export type TransactionType = "expense" | "income" | "transfer" | "saving";

export type RecurrenceFrequency = "weekly" | "monthly" | "yearly" | "custom";

export type MainGoal = "ahorrar" | "controlar" | "ambas";

export type DoodleIconName =
  | "coin"
  | "star"
  | "arrow"
  | "wallet"
  | "coffee"
  | "bag"
  | "character"
  | "flower"
  | "scribble"
  | "food"
  | "cart"
  | "transport"
  | "taxi"
  | "home"
  | "health"
  | "shirt"
  | "sparkle"
  | "movie"
  | "repeat"
  | "plane"
  | "gift"
  | "book"
  | "briefcase"
  | "card"
  | "piggy"
  | "target"
  | "check"
  | "cloud"
  | "dots";

export interface Category {
  id: ID;
  name: string;
  icon: DoodleIconName;
  color: PaletteColor;
  monthlyBudget?: number; // minor units
  order: number;
  isIncome?: boolean;
  archived?: boolean;
  createdAt: string;
}

export type AccountKind = "banco" | "billetera" | "efectivo" | "ahorros" | "otra";

export interface Account {
  id: ID;
  name: string;
  kind: AccountKind;
  color: PaletteColor;
  initialBalance: number; // minor units
  archived?: boolean;
  createdAt: string;
}

export interface CreditCard {
  id: ID;
  name: string;
  closingDay: number; // 1-28
  dueDay: number; // 1-28
  color: PaletteColor;
  createdAt: string;
  archived?: boolean;
}

export interface RecurringTransaction {
  id: ID;
  type: "expense" | "income";
  amount: number; // minor units
  categoryId: ID;
  description: string;
  frequency: RecurrenceFrequency;
  customDays?: number;
  startDate: string; // ISO yyyy-mm-dd
  nextDate: string; // ISO yyyy-mm-dd — next time it should generate/remind
  accountId?: ID;
  paymentMethod?: PaymentMethod;
  isSubscription?: boolean;
  active: boolean;
  createdAt: string;
}

export type SavingDirection = "in" | "out";

export interface Transaction {
  id: ID;
  type: TransactionType;
  amount: number; // minor units, always positive
  categoryId?: ID; // expense / income
  date: string; // ISO yyyy-mm-dd
  description?: string;
  paymentMethod?: PaymentMethod;
  accountId?: ID;
  toAccountId?: ID; // transfer only
  tags?: string[];
  recurringId?: ID;
  isCreditCard?: boolean;
  creditCardId?: ID;
  savingsGoalId?: ID; // saving only, optional allocation to a goal
  direction?: SavingDirection; // saving only
  createdAt: string;
  updatedAt: string;
}

export interface SavingsGoal {
  id: ID;
  name: string;
  targetAmount: number; // minor units, in goal currency
  currency: string; // ISO 4217
  savedAmount: number; // minor units, in goal currency
  targetDate?: string;
  color: PaletteColor;
  archived?: boolean;
  createdAt: string;
}

export interface MonthRecord {
  id: string; // yyyy-mm
  closed: boolean;
  closedAt?: string;
}

export interface Settings {
  id: "settings";
  currency: string; // ISO 4217
  locale: string;
  weekStartsOn: 0 | 1;
  payday: number; // 1-31
  mainGoal: MainGoal;
  monthlySavingsTarget: number; // minor units
  initialBalance: number; // minor units, "plata actual" at onboarding
  initialSavings: number; // minor units, "ahorrado" at onboarding
  monthlyIncomeEstimate: number; // minor units
  onboarded: boolean;
  isDemo: boolean;
  numberDisplayMode: "full" | "compact";
  createdAt: string;
}

export type InvestmentKind = "dolares" | "plazo_fijo" | "acciones" | "cripto" | "fondo" | "otro";

export interface Investment {
  id: ID;
  name: string;
  kind: InvestmentKind;
  color: PaletteColor;
  currentValue?: number; // minor units, local currency — manually updated market value
  archived?: boolean;
  createdAt: string;
}

export type InvestmentDirection = "buy" | "sell";

export interface InvestmentMovement {
  id: ID;
  investmentId: ID;
  direction: InvestmentDirection;
  amountLocal: number; // minor units, local currency committed/returned
  amountForeign?: number; // minor units, only for "dolares" kind — USD bought/sold
  date: string; // ISO yyyy-mm-dd
  notes?: string;
  createdAt: string;
}

export const CURRENT_SCHEMA_VERSION = 1;
