"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCategories, useSettings, useTransactions } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import { computeCategoryRanking, computeMonthSummary } from "@/lib/calc";
import { monthIdOf, shiftMonthId } from "@/lib/date";
import { formatMoney, formatPercent, monthShortLabel } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";

const MONTHS_BACK = 6;

export default function HistorialPage() {
  const settings = useSettings();
  const transactions = useTransactions();
  const categories = useCategories();
  const router = useRouter();
  const setSelectedMonthId = useUiStore((s) => s.setSelectedMonthId);

  const months = useMemo(() => {
    const now = monthIdOf(new Date());
    return Array.from({ length: MONTHS_BACK }).map((_, i) => shiftMonthId(now, -(MONTHS_BACK - 1 - i)));
  }, []);

  const rows = useMemo(() => {
    if (!settings) return [];
    return months.map((m) => {
      const summary = computeMonthSummary(transactions, settings, m);
      const ranking = computeCategoryRanking(summary.transactions, categories, "expense");
      return { monthId: m, summary, topCategory: ranking[0]?.category?.name };
    });
  }, [months, settings, transactions, categories]);

  if (!settings) return null;
  const { currency, locale } = settings;

  function openMonth(monthId: string) {
    setSelectedMonthId(monthId);
    router.push("/mes");
  }

  const metrics: { label: string; get: (r: (typeof rows)[number]) => string }[] = [
    { label: "Ingresos", get: (r) => formatMoney(r.summary.income, currency, locale, { compact: true }) },
    { label: "Gastos", get: (r) => formatMoney(r.summary.expense, currency, locale, { compact: true }) },
    { label: "Ahorro", get: (r) => formatMoney(r.summary.netSavings, currency, locale, { compact: true }) },
    { label: "Tasa de ahorro", get: (r) => formatPercent(Math.max(r.summary.savingsRate, 0)) },
    { label: "Categoría principal", get: (r) => r.topCategory ?? "—" },
  ];

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Cómo veníamos" title="Historial" subtitle="the receipts, over time" />

      <div className="px-4 sm:px-6 py-5 overflow-x-auto">
        <table className="w-full border-collapse min-w-[560px]">
          <thead>
            <tr>
              <th className="text-left font-mono text-[10px] uppercase tracking-wider opacity-60 pb-3 pr-3 sticky left-0 bg-paper" />
              {rows.map((r) => (
                <th key={r.monthId} className="pb-3 px-2">
                  <button
                    onClick={() => openMonth(r.monthId)}
                    className="font-display font-bold text-lg sm:text-xl press-down rounded-2xl px-2.5 py-1.5 shadow-hard-sm bg-white w-full"
                  >
                    {monthShortLabel(r.monthId)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, i) => (
              <tr key={metric.label} className={i % 2 === 0 ? "bg-white/50" : ""}>
                <td className="font-mono text-[11px] uppercase tracking-wide py-3 pr-3 sticky left-0 bg-inherit whitespace-nowrap">
                  {metric.label}
                </td>
                {rows.map((r) => (
                  <td key={r.monthId} className="text-center font-display text-base sm:text-lg py-3 px-2 border-t border-ink/10/10">
                    {metric.get(r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="px-4 sm:px-6 py-5 border-t border-ink/10">
        <h2 className="font-hand text-3xl mb-4">Evolución de gastos</h2>
        <div className="grid gap-2 items-end h-40" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0,1fr))` }}>
          {rows.map((r) => {
            const max = Math.max(...rows.map((x) => x.summary.expense), 1);
            const h = Math.max((r.summary.expense / max) * 100, 3);
            return (
              <div key={r.monthId} className="flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex-1 flex items-end">
                  <div className="w-full rounded-t-lg bg-orange" style={{ height: `${h}%` }} />
                </div>
                <span className="font-mono text-[10px] font-bold">{monthShortLabel(r.monthId)}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
