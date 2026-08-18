"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSettings, useTransactions } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import { computeMonthSummary, computeTotalSavings } from "@/lib/calc";
import { monthIdOf, shiftMonthId } from "@/lib/date";
import { formatMoney, formatPercent, monthShortLabel } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import StatNumber from "@/components/ds/StatNumber";
import Button from "@/components/ds/Button";
import EmptyState from "@/components/ds/EmptyState";
import DoodleIcon from "@/components/doodles/DoodleIcon";

export default function AhorrosPage() {
  const settings = useSettings();
  const transactions = useTransactions();
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);

  const data = useMemo(() => {
    if (!settings) return null;
    const now = monthIdOf(new Date());
    const summary = computeMonthSummary(transactions, settings, now);
    const total = computeTotalSavings(settings, transactions);
    const months = Array.from({ length: 6 }).map((_, i) => shiftMonthId(now, -(5 - i)));
    const evolution = months.map((m) => ({
      monthId: m,
      net: computeMonthSummary(transactions, settings, m).netSavings,
    }));
    const savingMoves = transactions
      .filter((t) => t.type === "saving")
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    return { summary, total, evolution, savingMoves };
  }, [settings, transactions]);

  if (!settings || !data) return null;
  const { currency, locale } = settings;
  const maxAbs = Math.max(...data.evolution.map((e) => Math.abs(e.net)), 1);

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Lo que va quedando" title="Ahorros" subtitle="money, mostly saved" />

      <div className="grid grid-cols-1 sm:grid-cols-3 border-b-2 border-ink">
        <Block color="mint" shadow="none" className="border-0 sm:border-r-2 border-b-2 sm:border-b-0 border-ink">
          <StatNumber label="Ahorro total" value={formatMoney(data.total, currency, locale)} size="xl" />
        </Block>
        <Block color="cream" shadow="none" className="border-0 sm:border-r-2 border-b-2 sm:border-b-0 border-ink">
          <StatNumber label="Ahorro del mes" value={formatMoney(data.summary.netSavings, currency, locale)} size="lg" />
        </Block>
        <Block color="yellow" shadow="none" className="border-0 border-ink">
          <StatNumber
            label="% del ingreso ahorrado"
            value={formatPercent(Math.max(data.summary.savingsRate, 0))}
            size="lg"
          />
        </Block>
      </div>

      <section className="px-4 sm:px-6 py-5 border-b-2 border-ink">
        <h2 className="font-hand text-3xl mb-4">Evolución</h2>
        <div className="grid grid-cols-6 gap-2 items-end h-32">
          {data.evolution.map((e) => {
            const h = Math.max((Math.abs(e.net) / maxAbs) * 100, 4);
            return (
              <div key={e.monthId} className="flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full border-2 border-ink ${e.net >= 0 ? "bg-lime" : "bg-pink"}`}
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] font-bold">{monthShortLabel(e.monthId)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="px-4 sm:px-6 py-5 flex gap-3 border-b-2 border-ink">
        <Button onClick={() => openQuickAdd("saving")}>+ Movimiento de ahorro</Button>
        <Link href="/metas">
          <Button variant="outline">Ver metas</Button>
        </Link>
      </div>

      <section className="px-4 sm:px-6 py-5">
        <h2 className="font-hand text-3xl mb-3">Movimientos hacia / desde ahorros</h2>
        {data.savingMoves.length === 0 ? (
          <EmptyState icon="piggy" title="Todavía no moviste plata a tus ahorros." />
        ) : (
          <div className="flex flex-col">
            {data.savingMoves.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-ink/15">
                <span className="flex items-center gap-2 font-mono text-sm">
                  <DoodleIcon name={t.direction === "in" ? "arrow" : "arrow"} size={14} />
                  {t.date} · {t.description ?? (t.direction === "in" ? "Depósito" : "Retiro")}
                </span>
                <span className={`font-display text-lg ${t.direction === "in" ? "text-lime" : "text-orange"}`}>
                  {t.direction === "in" ? "+" : "−"}
                  {formatMoney(t.amount, currency, locale)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
