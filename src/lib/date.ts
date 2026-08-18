import { isoFromDate } from "./format";

export function monthIdOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function shiftMonthId(monthId: string, delta: number): string {
  const [y, m] = monthId.split("-").map(Number);
  return monthIdOf(new Date(y, m - 1 + delta, 1));
}

export interface MonthRange {
  start: Date;
  end: Date;
  startIso: string;
  endIso: string;
  daysInMonth: number;
}

export function getMonthRange(monthId: string): MonthRange {
  const [y, m] = monthId.split("-").map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 0);
  return {
    start,
    end,
    startIso: isoFromDate(start),
    endIso: isoFromDate(end),
    daysInMonth: end.getDate(),
  };
}

export function isFutureMonth(monthId: string): boolean {
  return monthId > monthIdOf(new Date());
}

export function isCurrentMonth(monthId: string): boolean {
  return monthId === monthIdOf(new Date());
}

export function daysElapsedInMonth(monthId: string): number {
  const range = getMonthRange(monthId);
  const today = new Date();
  if (monthId < monthIdOf(today)) return range.daysInMonth;
  if (monthId > monthIdOf(today)) return 0;
  return today.getDate();
}

export function daysRemainingInMonth(monthId: string): number {
  const range = getMonthRange(monthId);
  const today = new Date();
  if (monthId < monthIdOf(today)) return 0;
  if (monthId > monthIdOf(today)) return range.daysInMonth;
  return range.daysInMonth - today.getDate() + 1;
}

/** Start of the week containing `date`, per weekStartsOn (0=Sun,1=Mon). */
export function weekStart(date: Date, weekStartsOn: 0 | 1): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function weekIndexInMonth(date: Date, weekStartsOn: 0 | 1): number {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekStart = weekStart(first, weekStartsOn);
  const thisWeekStart = weekStart(date, weekStartsOn);
  const diffDays = Math.round((thisWeekStart.getTime() - firstWeekStart.getTime()) / 86_400_000);
  return Math.floor(diffDays / 7) + 1;
}

export function parseIsoDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

export function clampDay(year: number, month0: number, day: number): Date {
  const lastDay = new Date(year, month0 + 1, 0).getDate();
  return new Date(year, month0, Math.min(day, lastDay));
}
