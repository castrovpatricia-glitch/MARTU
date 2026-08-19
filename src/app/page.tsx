"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSettings, useTransactions, useCategories } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import {
  computeAvailableBalance,
  computeCanSpend,
  computeCategoryRanking,
  computeDailyBudget,
  computeMonthSummary,
  computeTotalSavings,
} from "@/lib/calc";
import { shiftMonthId } from "@/lib/date";
import { formatMoney } from "@/lib/format";
import { generateBudgetAlerts, generateInsights } from "@/lib/insights";
import Block from "@/components/ds/Block";
import StatNumber from "@/components/ds/StatNumber";
import Button from "@/components/ds/Button";
import MonthSwitcher from "@/components/ds/MonthSwitcher";
import EmptyState from "@/components/ds/EmptyState";
import DoodleIcon from "@/components/doodles/DoodleIcon";

export default function HomePage() {
  const settings = useSettings();
  const transactions = useTransactions();
  const categories = useCategories();
  const monthId = useUiStore((s) => s.selectedMonthId);
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);

  const data = useMemo(() => {
    if (!settings) return null;
    const summary = computeMonthSummary(transactions, settings, monthId);
    const prevSummary = computeMonthSummary(transactions, settings, shiftMonthId(monthId, -1));
    const available = computeAvailableBalance(settings, transactions);
    const totalSavings = computeTotalSavings(settings, transactions);
    const prevTotalSavings = totalSavings - summary.netSavings;
    const canSpend = computeCanSpend(summary, settings);
    const dailyBudget = computeDailyBudget(summary, settings);
    const ranking = computeCategoryRanking(summary.transactions, categories, "expense");
    const alerts = generateBudgetAlerts(ranking, settings);
    const insights = generateInsights(transactions, categories, settings, monthId);
    return { summary, prevSummary, available, totalSavings, prevTotalSavings, canSpend, dailyBudget, ranking, alerts, insights };
  }, [settings, transactions, categories, monthId]);

  if (!settings || !data) return null;

  const { currency, locale } = settings;
  const hasEnoughData = transactions.length >= 3;

  return (
    <div className="pb-10 px-4 sm:px-6 pt-4 flex flex-col gap-4">
      <MonthSwitcher />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Block color="cream" shadow="sm" className="lg:col-span-2">
          <StatNumber label="Plata actual" value={formatMoney(data.available, currency, locale)} size="xl" />
          <div className="flex gap-2 mt-3 font-mono text-xs sm:text-sm flex-wrap">
            <span className="text-lime bg-ink rounded-full px-3 py-1">+ {formatMoney(data.summary.income, currency, locale)} ingresos</span>
            <span className="text-pink bg-ink rounded-full px-3 py-1">− {formatMoney(data.summary.expense, currency, locale)} gastos</span>
          </div>
        </Block>

        <Block color="mint" shadow="sm">
          <StatNumber label="Ahorrado total" value={formatMoney(data.totalSavings, currency, locale)} size="lg" />
          <p className="font-mono text-xs sm:text-sm mt-3">
            {data.summary.netSavings >= 0 ? "+" : ""}
            {formatMoney(data.summary.netSavings, currency, locale)} este mes
          </p>
        </Block>

        <Block color="yellow" shadow="sm" className="flex flex-col justify-between">
          <StatNumber label="Podés gastar" value={formatMoney(Math.max(data.canSpend, 0), currency, locale)} size="lg" />
          <p className="font-mono text-[11px] mt-2 opacity-70">para lo que queda del mes</p>
        </Block>
      </div>

      <Block color="white" shadow="sm" padded={false} className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/8 overflow-hidden">
        <StatCell label="Ingresos" value={formatMoney(data.summary.income, currency, locale)} />
        <StatCell label="Gastos" value={formatMoney(data.summary.expense, currency, locale)} />
        <StatCell label="Ahorraste" value={formatMoney(data.summary.netSavings, currency, locale)} />
      </Block>

      <Block color="orange" shadow="sm" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">Gasto diario disponible</p>
          <p className="font-display font-bold text-4xl sm:text-6xl leading-none mt-1">
            {formatMoney(Math.max(data.dailyBudget, 0), currency, locale)}
            <span className="font-hand text-2xl sm:text-3xl">/día</span>
          </p>
        </div>
        <p className="font-mono text-xs opacity-90 max-w-xs">
          {data.summary.daysRemaining} días para terminar el mes sin pasarte del presupuesto.
        </p>
      </Block>

      <Button size="lg" color="ink" onClick={() => openQuickAdd("expense")} className="w-full sm:w-auto">
        + Agregar gasto
      </Button>

      {!hasEnoughData && (
        <EmptyState
          icon="wallet"
          title="Todavía no sabemos dónde se te va la plata."
          subtitle="Agregá tus primeros gastos y esto se va a poner interesante."
        />
      )}

      {hasEnoughData && data.ranking.length > 0 && (
        <Block color="white" shadow="sm">
          <h2 className="font-hand text-3xl mb-3">Where did my money go?</h2>
          <div className="flex flex-col gap-1">
            {data.ranking.slice(0, 4).map((stat, i) => (
              <div key={stat.categoryId} className="flex items-center justify-between font-mono text-sm py-2.5">
                <span className="flex items-center gap-2">
                  <span className="opacity-40">{String(i + 1).padStart(2, "0")}</span>
                  {stat.category && (
                    <span className="w-7 h-7 rounded-full bg-cream flex items-center justify-center shrink-0">
                      <DoodleIcon name={stat.category.icon} size={14} />
                    </span>
                  )}
                  {stat.category?.name ?? "Otros"}
                </span>
                <span className="font-display font-bold text-lg">{formatMoney(stat.total, currency, locale)}</span>
              </div>
            ))}
          </div>
          <Link href="/mes" className="font-mono text-xs underline underline-offset-2 mt-3 inline-block">
            Ver el mes completo →
          </Link>
        </Block>
      )}

      {(data.alerts.length > 0 || data.insights.length > 0) && (
        <div className="flex flex-col gap-3">
          <h2 className="font-hand text-3xl">Notas sobre tu plata</h2>
          {data.alerts.map((a) => (
            <Block key={a.categoryId} color={a.tone === "over" ? "pink" : "yellow"} shadow="sm" className="py-3 px-4">
              <p className="font-mono text-xs sm:text-sm">{a.text}</p>
            </Block>
          ))}
          {data.insights.map((insight) => (
            <Block key={insight.id} color="blue" shadow="sm" className="py-3 px-4">
              <p className="font-mono text-xs sm:text-sm">{insight.text}</p>
            </Block>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-4">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider opacity-50">{label}</p>
      <p className="font-display font-bold text-2xl sm:text-3xl mt-1">{value}</p>
    </div>
  );
}
