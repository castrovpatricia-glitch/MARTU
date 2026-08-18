"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCategories, useMonths, useSettings, useTransactions } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import {
  biggestExpenseDay,
  biggestSingleExpense,
  computeCalendarData,
  computeCategoryRanking,
  computeCurrentWeekSummary,
  computeFixedExpenseTotal,
  computeHealthCheck,
  computeMonthSummary,
  forecastMonthEnd,
  percentChange,
} from "@/lib/calc";
import { getMonthRange, isCurrentMonth, shiftMonthId } from "@/lib/date";
import { formatDateShort, formatMoney, formatPercent } from "@/lib/format";
import { closeMonth } from "@/lib/repo";
import MonthSwitcher from "@/components/ds/MonthSwitcher";
import Block from "@/components/ds/Block";
import StatNumber from "@/components/ds/StatNumber";
import BarRow from "@/components/ds/BarRow";
import Button from "@/components/ds/Button";
import ConfirmDialog from "@/components/ds/ConfirmDialog";
import EmptyState from "@/components/ds/EmptyState";
import CalendarGrid from "@/components/mes/CalendarGrid";
import WeekStrip from "@/components/mes/WeekStrip";

export default function MesPage() {
  const settings = useSettings();
  const transactions = useTransactions();
  const categories = useCategories();
  const months = useMonths();
  const monthId = useUiStore((s) => s.selectedMonthId);
  const [confirmClose, setConfirmClose] = useState(false);

  const data = useMemo(() => {
    if (!settings) return null;
    const summary = computeMonthSummary(transactions, settings, monthId);
    const prevSummary = computeMonthSummary(transactions, settings, shiftMonthId(monthId, -1));
    const ranking = computeCategoryRanking(summary.transactions, categories, "expense");
    const calendar = computeCalendarData(monthId, transactions);
    const week = computeCurrentWeekSummary(transactions, settings.weekStartsOn);
    const fixedTotal = computeFixedExpenseTotal(summary.transactions);
    const health = computeHealthCheck(summary, fixedTotal);
    const forecast = forecastMonthEnd(summary);
    const expenseChange = percentChange(summary.expense, prevSummary.expense);
    const bigDay = biggestExpenseDay(summary.transactions);
    const bigTx = biggestSingleExpense(summary.transactions);
    const firstWeekday = getMonthRange(monthId).start.getDay();
    return { summary, prevSummary, ranking, calendar, week, fixedTotal, health, forecast, expenseChange, bigDay, bigTx, firstWeekday };
  }, [settings, transactions, categories, monthId]);

  if (!settings || !data) return null;
  const { currency, locale } = settings;
  const monthRecord = months.find((m) => m.id === monthId);
  const isClosed = monthRecord?.closed ?? false;
  const isCurrent = isCurrentMonth(monthId);
  const maxCalendarDay = Math.max(...data.calendar.map((d) => d.total), 1);

  async function handleClose() {
    await closeMonth(monthId);
    setConfirmClose(false);
  }

  return (
    <div className="pb-10">
      <MonthSwitcher />

      {isClosed && (
        <div className="bg-ink text-paper text-center font-mono text-xs uppercase tracking-widest py-1.5">
          Mes cerrado
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 border-b-2 border-ink">
        <StatCell label="Total gastado" value={formatMoney(data.summary.expense, currency, locale)} />
        <StatCell label="Ingresos" value={formatMoney(data.summary.income, currency, locale)} />
        <StatCell label="Ahorro" value={formatMoney(data.summary.netSavings, currency, locale)} />
        <StatCell
          label="% ingreso ahorrado"
          value={formatPercent(Math.max(data.summary.savingsRate, 0))}
        />
        <StatCell label="Promedio diario" value={formatMoney(Math.round(data.summary.avgDailySpend), currency, locale)} />
        <StatCell label="Día que más gastaste" value={data.bigDay ? formatDateShort(data.bigDay.date) : "—"} />
        <StatCell label="Categoría principal" value={data.ranking[0]?.category?.name ?? "—"} />
        <StatCell
          label="Vs. mes pasado"
          value={
            data.expenseChange === undefined
              ? "—"
              : `${data.expenseChange <= 0 ? "" : "+"}${formatPercent(data.expenseChange)}`
          }
        />
      </div>

      {data.expenseChange !== undefined && data.prevSummary.expense > 0 && (
        <Block color={data.expenseChange <= 0 ? "lime" : "pink"} shadow="none" className="border-0 border-b-2 border-ink">
          <p className="font-hand text-2xl sm:text-3xl">
            {data.expenseChange <= 0
              ? `Gastaste ${formatPercent(Math.abs(data.expenseChange))} menos que el mes pasado.`
              : `Gastaste ${formatPercent(data.expenseChange)} más que el mes pasado.`}
          </p>
        </Block>
      )}

      <section className="px-4 sm:px-6 py-5 border-b-2 border-ink">
        <h2 className="font-hand text-3xl mb-3">Categorías del mes</h2>
        {data.ranking.length === 0 ? (
          <EmptyState icon="cart" title="Sin gastos categorizados este mes." />
        ) : (
          <div>
            {data.ranking.map((stat, i) => (
              <BarRow
                key={stat.categoryId}
                rank={i + 1}
                label={stat.category?.name ?? "Otros"}
                value={formatMoney(stat.total, currency, locale)}
                pct={stat.percentOfTotal}
                color={stat.category?.color ?? "orange"}
                sublabel={`${formatPercent(stat.percentOfTotal)} del gasto total`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="px-4 sm:px-6 py-5 border-b-2 border-ink">
        <h2 className="font-hand text-3xl mb-3">Calendario de gastos</h2>
        <CalendarGrid days={data.calendar} firstWeekday={data.firstWeekday} currency={currency} locale={locale} max={maxCalendarDay} />
      </section>

      {isCurrent && (
        <section className="px-4 sm:px-6 py-5 border-b-2 border-ink">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-hand text-3xl">{data.week.label}</h2>
            {data.week.vsLastWeekPct !== undefined && (
              <span className="font-mono text-xs opacity-60">
                vs semana anterior: {data.week.vsLastWeekPct <= 0 ? "" : "+"}
                {formatPercent(data.week.vsLastWeekPct)}
              </span>
            )}
          </div>
          <p className="font-display text-3xl mb-1">{formatMoney(data.week.total, currency, locale)}</p>
          <p className="font-mono text-xs opacity-60 mb-4">
            Promedio diario: {formatMoney(Math.round(data.week.avgDaily), currency, locale)}
          </p>
          <WeekStrip week={data.week} />
        </section>
      )}

      <section className="px-4 sm:px-6 py-5 border-b-2 border-ink grid sm:grid-cols-2 gap-5">
        <Block color="blue" shadow="sm">
          <p className="font-mono text-xs uppercase tracking-wider mb-1">Al ritmo actual</p>
          <p className="font-hand text-2xl mb-2">
            terminarías {monthTitle(monthId)} gastando
          </p>
          <StatNumber label="Estimación, no es exacta" value={formatMoney(Math.round(data.forecast), currency, locale)} size="lg" />
        </Block>

        <Block color="cream" shadow="sm">
          <p className="font-mono text-xs uppercase tracking-wider mb-3">Tu mes en 4 números</p>
          <div className="grid grid-cols-2 gap-3">
            <HealthNum label="Ahorrado" value={data.health.savedPct} color="text-lime" />
            <HealthNum label="Gastos fijos" value={data.health.fixedPct} />
            <HealthNum label="Gastos variables" value={data.health.variablePct} />
            <HealthNum label="Disponible" value={data.health.availablePct} color="text-orange" />
          </div>
        </Block>
      </section>

      <section className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-hand text-3xl">Tu {monthTitle(monthId)}</h2>
          <p className="font-mono text-xs opacity-60 mt-1">
            Mayor gasto individual: {data.bigTx ? formatMoney(data.bigTx.amount, currency, locale) : "—"}
          </p>
          <Link href="/historial" className="font-mono text-xs underline underline-offset-2 mt-1 inline-block">
            Ver historial completo →
          </Link>
        </div>
        {isCurrent && !isClosed && (
          <Button color="ink" onClick={() => setConfirmClose(true)}>
            Cerrar mes
          </Button>
        )}
      </section>

      <ConfirmDialog
        open={confirmClose}
        title="¿Cerrar el mes?"
        message="Se guarda todo el historial y se arma automáticamente el mes siguiente. No perdés ningún dato."
        confirmLabel="Cerrar mes"
        danger={false}
        onConfirm={handleClose}
        onCancel={() => setConfirmClose(false)}
      />
    </div>
  );
}

function monthTitle(monthId: string) {
  const [, m] = monthId.split("-").map(Number);
  const names = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return names[m - 1];
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 sm:px-6 py-4 border-b-2 sm:border-b-0 border-r-2 border-ink [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-2 sm:[&:nth-child(4n)]:border-r-0">
      <p className="font-mono text-[10px] uppercase tracking-wider opacity-60">{label}</p>
      <p className="font-display text-xl sm:text-2xl mt-1 leading-tight">{value}</p>
    </div>
  );
}

function HealthNum({ label, value, color = "text-ink" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <p className={`font-display text-3xl ${color}`}>{formatPercent(Math.max(value, 0))}</p>
      <p className="font-mono text-[10px] uppercase tracking-wide opacity-70">{label}</p>
    </div>
  );
}
