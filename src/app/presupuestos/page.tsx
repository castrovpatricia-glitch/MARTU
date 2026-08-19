"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useActiveCategories, useSettings, useTransactions } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import { computeCategoryRanking, txInMonth } from "@/lib/calc";
import { generateBudgetAlerts } from "@/lib/insights";
import { formatMoney, toMajor, toMinor } from "@/lib/format";
import { updateCategory } from "@/lib/repo";
import MonthSwitcher from "@/components/ds/MonthSwitcher";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import ProgressBar from "@/components/ds/ProgressBar";
import Input from "@/components/ds/Input";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import EmptyState from "@/components/ds/EmptyState";
import { PALETTE_BG } from "@/components/ds/palette";

export default function PresupuestosPage() {
  const settings = useSettings();
  const categories = useActiveCategories();
  const transactions = useTransactions();
  const monthId = useUiStore((s) => s.selectedMonthId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const expenseCategories = useMemo(() => categories.filter((c) => !c.isIncome), [categories]);

  const monthTx = useMemo(() => txInMonth(transactions, monthId), [transactions, monthId]);
  const ranking = useMemo(() => computeCategoryRanking(monthTx, categories, "expense"), [monthTx, categories]);
  const rankingById = useMemo(() => new Map(ranking.map((r) => [r.categoryId, r])), [ranking]);
  const alerts = useMemo(() => (settings ? generateBudgetAlerts(ranking, settings) : []), [ranking, settings]);

  if (!settings) return null;
  const { currency, locale } = settings;

  const budgeted = expenseCategories.filter((c) => c.monthlyBudget);
  const unbudgeted = expenseCategories.filter((c) => !c.monthlyBudget);

  function startEdit(catId: string, current?: number) {
    setEditingId(catId);
    setDraft(current ? String(toMajor(current)) : "");
  }

  async function saveEdit(catId: string) {
    const value = parseFloat(draft || "0");
    await updateCategory(catId, { monthlyBudget: value > 0 ? toMinor(value) : undefined });
    setEditingId(null);
  }

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Ponele un límite a cada cosa" title="Presupuestos" subtitle="rent, coffee & bad decisions" />
      <MonthSwitcher />

      {alerts.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-b border-ink/10 flex flex-col gap-2">
          {alerts.map((a) => (
            <Block key={a.categoryId} color={a.tone === "over" ? "pink" : "yellow"} shadow="sm" className="py-2.5 px-3.5">
              <p className="font-mono text-xs sm:text-sm">{a.text}</p>
            </Block>
          ))}
        </div>
      )}

      <section className="px-4 sm:px-6 py-5 flex flex-col gap-3">
        {budgeted.length === 0 && (
          <EmptyState icon="piggy" title="Todavía no le pusiste límite a nada." subtitle="Elegí una categoría de abajo y definí un presupuesto mensual." />
        )}
        {budgeted.map((cat) => {
          const stat = rankingById.get(cat.id);
          const spent = stat?.total ?? 0;
          const budget = cat.monthlyBudget!;
          const pct = (spent / budget) * 100;
          const remaining = budget - spent;
          return (
            <Block key={cat.id} color={cat.color} shadow="sm" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-sans font-bold uppercase text-sm">
                  <DoodleIcon name={cat.icon} size={18} /> {cat.name}
                </span>
                {editingId === cat.id ? (
                  <div className="flex items-center gap-1">
                    <Input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => saveEdit(cat.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(cat.id)}
                      className="w-28 py-1 text-sm"
                    />
                  </div>
                ) : (
                  <button onClick={() => startEdit(cat.id, cat.monthlyBudget)} className="font-mono text-xs underline underline-offset-2">
                    editar límite
                  </button>
                )}
              </div>
              <ProgressBar pct={pct} />
              <div className="flex justify-between font-mono text-xs">
                <span>Gastado: {formatMoney(spent, currency, locale)}</span>
                <span>Presupuesto: {formatMoney(budget, currency, locale)}</span>
                <span className={remaining < 0 ? "text-orange font-bold" : ""}>
                  {remaining < 0 ? "Superado por " : "Disponible: "}
                  {formatMoney(Math.abs(remaining), currency, locale)}
                </span>
              </div>
            </Block>
          );
        })}
      </section>

      {unbudgeted.length > 0 && (
        <section className="px-4 sm:px-6 py-5 border-t border-ink/10">
          <h2 className="font-hand text-3xl mb-3">Sin presupuesto todavía</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {unbudgeted.map((cat) => (
              <button
                key={cat.id}
                onClick={() => startEdit(cat.id)}
                className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 press-down shadow-hard-sm ${PALETTE_BG[cat.color]}`}
              >
                <DoodleIcon name={cat.icon} size={16} />
                <span className="font-mono text-xs uppercase truncate">{cat.name}</span>
              </button>
            ))}
          </div>
          {editingId && unbudgeted.some((c) => c.id === editingId) && (
            <div className="mt-3 flex items-center gap-2">
              <Input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Monto mensual" className="max-w-xs" />
              <button onClick={() => saveEdit(editingId)} className="font-mono text-xs uppercase font-bold underline underline-offset-2">
                Guardar
              </button>
            </div>
          )}
        </section>
      )}

      <p className="px-4 sm:px-6 py-4 font-mono text-xs opacity-60">
        ¿Querés crear, borrar o reordenar categorías? Andá a{" "}
        <Link href="/ajustes" className="underline underline-offset-2">
          Ajustes
        </Link>
        .
      </p>
    </div>
  );
}
