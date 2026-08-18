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
    <div className="pb-10">
      <MonthSwitcher />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-b-2 border-ink">
        <Block color="cream" shadow="none" className="border-0 border-b-2 sm:border-r-2 border-ink lg:col-span-2">
          <StatNumber label="Plata actual" value={formatMoney(data.available, currency, locale)} size="xl" />
          <div className="flex gap-4 mt-3 font-mono text-xs sm:text-sm">
            <span className="text-lime bg-ink px-2 py-0.5">+ {formatMoney(data.summary.income, currency, locale)} ingresos</span>
            <span className="text-pink bg-ink px-2 py-0.5">− {formatMoney(data.summary.expense, currency, locale)} gastos</span>
          </div>
        </Block>

        <Block color="mint" shadow="none" className="border-0 border-b-2 sm:border-r-2 lg:border-r-2 border-ink">
          <StatNumber label="Ahorrado total" value={formatMoney(data.totalSavings, currency, locale)} size="lg" />
          <p className="font-mono text-xs sm:text-sm mt-3">
            {data.summary.netSavings >= 0 ? "+" : ""}
            {formatMoney(data.summary.netSavings, currency, locale)} este mes
          </p>
        </Block>

        <Block color="yellow" shadow="none" className="border-0 border-b-2 border-ink flex flex-col justify-between">
          <StatNumber label="Podés gastar" value={formatMoney(Math.max(data.canSpend, 0), currency, locale)} size="lg" />
          <p className="font-mono text-[11px] mt-2 opacity-70">para lo que queda del mes</p>
        </Block>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 border-b-2 border-ink">
        <StatCell label="Ingresos" value={formatMoney(data.summary.income, currency, locale)} />
        <StatCell label="Gastos" value={formatMoney(data.summary.expense, currency, locale)} border />
        <StatCell label="Ahorraste" value={formatMoney(data.summary.netSavings, currency, locale)} />
      </div>

      <Block color="orange" shadow="none" className="border-0 border-b-2 border-ink flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider opacity-90">Gasto diario disponible</p>
          <p className="font-display text-4xl sm:text-6xl leading-none mt-1">
            {formatMoney(Math.max(data.dailyBudget, 0), currency, locale)}
            <span className="font-hand text-2xl sm:text-3xl">/día</span>
          </p>
        </div>
        <p className="font-mono text-xs opacity-90 max-w-xs">
          {data.summary.daysRemaining} días para terminar el mes sin pasarte del presupuesto.
        </p>
      </Block>

      <div className="px-4 sm:px-6 py-5">
        <Button size="lg" color="ink" onClick={() => openQuickAdd("expense")} className="w-full sm:w-auto">
          + Agregar gasto
        </Button>
      </div>

      {!hasEnoughData && (
        <EmptyState
          icon="wallet"
          title="Todavía no sabemos dónde se te va la plata."
          subtitle="Agregá tus primeros gastos y esto se va a poner interesante."
        />
      )}

      {hasEnoughData && data.ranking.length > 0 && (
        <section className="px-4 sm:px-6 py-5 border-t-2 border-ink">
          <h2 className="font-hand text-3xl mb-3">Where did my money go?</h2>
          <div className="flex flex-col gap-2">
            {data.ranking.slice(0, 4).map((stat, i) => (
              <div key={stat.categoryId} className="flex items-center justify-between font-mono text-sm border-b border-ink/15 py-2">
                <span className="flex items-center gap-2">
                  <span className="opacity-40">{String(i + 1).padStart(2, "0")}</span>
                  {stat.category && <DoodleIcon name={stat.category.icon} size={16} />}
                  {stat.category?.name ?? "Otros"}
                </span>
                <span className="font-display text-lg">{formatMoney(stat.total, currency, locale)}</span>
              </div>
            ))}
          </div>
          <Link href="/mes" className="font-mono text-xs underline underline-offset-2 mt-3 inline-block">
            Ver el mes completo →
          </Link>
        </section>
      )}

      {(data.alerts.length > 0 || data.insights.length > 0) && (
        <section className="px-4 sm:px-6 py-5 border-t-2 border-ink flex flex-col gap-3">
          <h2 className="font-hand text-3xl">Notas sobre tu plata</h2>
          {data.alerts.map((a) => (
            <Block key={a.categoryId} color={a.tone === "over" ? "pink" : "yellow"} shadow="sm" className="py-2.5 px-3.5">
              <p className="font-mono text-xs sm:text-sm">{a.text}</p>
            </Block>
          ))}
          {data.insights.map((insight) => (
            <Block key={insight.id} color="blue" shadow="sm" className="py-2.5 px-3.5">
              <p className="font-mono text-xs sm:text-sm">{insight.text}</p>
            </Block>
          ))}
        </section>
      )}
    </div>
  );
}

function StatCell({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`px-4 sm:px-6 py-4 ${border ? "sm:border-x-2 border-ink border-t-2 sm:border-t-0" : "border-t-2 sm:border-t-0 border-ink"}`}>
      <p className="font-mono text-[11px] uppercase tracking-wider opacity-60">{label}</p>
      <p className="font-display text-2xl sm:text-3xl mt-1">{value}</p>
    </div>
  );
}
