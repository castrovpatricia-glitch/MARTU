import type { Category, Settings, Transaction } from "./types";
import {
  computeCategoryRanking,
  computeMonthSummary,
  forecastMonthEnd,
  percentChange,
  spendByDayOfWeek,
  weekendVsWeekdayShare,
  type CategoryStat,
} from "./calc";
import { shiftMonthId } from "./date";
import { formatMoney, formatPercent } from "./format";
import { dayMedLabel } from "./format";

export interface Insight {
  id: string;
  text: string;
  tone: "neutral" | "positive" | "watch";
}

const MIN_TRANSACTIONS_FOR_INSIGHTS = 5;

/** Rule-based, no external AI — only fires when there's enough real data. */
export function generateInsights(
  transactions: Transaction[],
  categories: Category[],
  settings: Settings,
  monthId: string
): Insight[] {
  const monthSummary = computeMonthSummary(transactions, settings, monthId);
  if (monthSummary.transactions.length < MIN_TRANSACTIONS_FOR_INSIGHTS) return [];

  const insights: Insight[] = [];
  const prevMonthId = shiftMonthId(monthId, -1);
  const prevSummary = computeMonthSummary(transactions, settings, prevMonthId);

  if (prevSummary.expense > 0) {
    const change = percentChange(monthSummary.expense, prevSummary.expense);
    if (change !== undefined && Math.abs(change) >= 3) {
      insights.push({
        id: "vs-last-month",
        tone: change < 0 ? "positive" : "watch",
        text:
          change < 0
            ? `Gastaste ${formatPercent(Math.abs(change))} menos que el mes pasado.`
            : `Gastaste ${formatPercent(change)} más que el mes pasado.`,
      });
    }
  }

  const ranking = computeCategoryRanking(monthSummary.transactions, categories, "expense");
  if (ranking.length > 0 && ranking[0].category) {
    insights.push({
      id: "top-category",
      tone: "neutral",
      text: `${ranking[0].category.name} fue tu categoría más alta este mes: ${formatMoney(ranking[0].total, settings.currency, settings.locale)}.`,
    });
  }

  const weekendShare = weekendVsWeekdayShare(monthSummary.transactions);
  if (weekendShare > 0) {
    insights.push({
      id: "weekend-share",
      tone: weekendShare >= 40 ? "watch" : "neutral",
      text: `Los fines de semana representan el ${formatPercent(weekendShare)} de tus gastos este mes.`,
    });
  }

  if (monthSummary.income > 0) {
    insights.push({
      id: "savings-rate",
      tone: monthSummary.savingsRate >= 0 ? "positive" : "watch",
      text: `Este mes ahorraste el ${formatPercent(Math.max(monthSummary.savingsRate, 0))} de tus ingresos.`,
    });
  }

  const byDay = spendByDayOfWeek(monthSummary.transactions);
  const withData = byDay.filter((d) => d.count > 0);
  if (withData.length >= 4) {
    const min = withData.reduce((a, b) => (b.total < a.total ? b : a));
    insights.push({
      id: "quiet-day",
      tone: "neutral",
      text: `Los ${dayMedLabel(min.dayOfWeek).toLowerCase()}s son el día en que menos gastás.`,
    });
  }

  if (monthSummary.daysElapsed >= 5 && monthSummary.daysElapsed < monthSummary.daysInMonth) {
    const forecast = forecastMonthEnd(monthSummary);
    const remaining = monthSummary.income > 0 ? monthSummary.income - forecast : undefined;
    if (remaining !== undefined) {
      insights.push({
        id: "forecast",
        tone: "neutral",
        text: `Si mantenés este ritmo, terminarías el mes con ${formatMoney(Math.round(remaining), settings.currency, settings.locale)} disponibles.`,
      });
    }
  }

  return insights;
}

export interface BudgetAlert {
  categoryId: string;
  categoryName: string;
  tone: "watch" | "over";
  text: string;
}

/** Objective, non-judgmental budget alerts — only for categories with a budget set. */
export function generateBudgetAlerts(
  ranking: CategoryStat[],
  settings: Settings
): BudgetAlert[] {
  const alerts: BudgetAlert[] = [];
  for (const stat of ranking) {
    if (!stat.budget || !stat.category) continue;
    const pct = stat.budgetUsedPct ?? 0;
    if (pct >= 100) {
      const over = stat.total - stat.budget;
      alerts.push({
        categoryId: stat.categoryId,
        categoryName: stat.category.name,
        tone: "over",
        text: `Superaste tu presupuesto de ${stat.category.name} por ${formatMoney(over, settings.currency, settings.locale)}.`,
      });
    } else if (pct >= 80) {
      alerts.push({
        categoryId: stat.categoryId,
        categoryName: stat.category.name,
        tone: "watch",
        text: `Gastaste el ${formatPercent(pct)} de tu presupuesto de ${stat.category.name}.`,
      });
    }
  }
  return alerts;
}
