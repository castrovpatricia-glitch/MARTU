"use client";

import { useMemo, useState } from "react";
import { useCategories, useRecurring, useSettings, useTransactions } from "@/lib/hooks";
import { addRecurring, deleteRecurring } from "@/lib/repo";
import { computeMonthSummary } from "@/lib/calc";
import { monthIdOf } from "@/lib/date";
import { formatDateShort, formatMoney, formatPercent, toMinor } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import StatNumber from "@/components/ds/StatNumber";
import Button from "@/components/ds/Button";
import Sheet from "@/components/ds/Sheet";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import MoneyInput from "@/components/ds/MoneyInput";
import Select from "@/components/ds/Select";
import Segmented from "@/components/ds/Segmented";
import Toggle from "@/components/ds/Toggle";
import EmptyState from "@/components/ds/EmptyState";
import type { RecurrenceFrequency } from "@/lib/types";

export default function FijosPage() {
  const settings = useSettings();
  const recurring = useRecurring();
  const categories = useCategories();
  const transactions = useTransactions();
  const [creating, setCreating] = useState(false);

  const active = recurring.filter((r) => r.active);
  const fixedExpenses = active.filter((r) => r.type === "expense");
  const monthlyTotal = fixedExpenses
    .filter((r) => r.frequency === "monthly")
    .reduce((s, r) => s + r.amount, 0);

  const monthSummary = useMemo(() => {
    if (!settings) return null;
    return computeMonthSummary(transactions, settings, monthIdOf(new Date()));
  }, [settings, transactions]);

  const incomeBase = monthSummary?.income || settings?.monthlyIncomeEstimate || 0;
  const pctOfIncome = incomeBase > 0 ? (monthlyTotal / incomeBase) * 100 : 0;

  const upcoming = [...active]
    .sort((a, b) => (a.nextDate < b.nextDate ? -1 : 1))
    .slice(0, 8);

  const catById = new Map(categories.map((c) => [c.id, c]));

  if (!settings) return null;
  const { currency, locale } = settings;

  return (
    <div className="pb-10 px-4 sm:px-6 pt-4 flex flex-col gap-4">
      <PageHeader eyebrow="Lo que se va sí o sí" title="Fijos" subtitle="rent, wifi & the usual suspects" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Block color="orange" shadow="sm">
          <StatNumber label="Gastos fijos mensuales" value={formatMoney(monthlyTotal, currency, locale)} size="xl" />
        </Block>
        <Block color="cream" shadow="sm" className="flex flex-col justify-center">
          <p className="font-hand text-2xl">
            representan el {formatPercent(pctOfIncome)} de tus ingresos
          </p>
        </Block>
      </div>

      <Button onClick={() => setCreating(true)} className="self-start">+ Nuevo gasto fijo</Button>

      <Block color="white" shadow="sm">
        <h2 className="font-hand text-3xl mb-3">Próximos pagos</h2>
        {upcoming.length === 0 ? (
          <EmptyState icon="repeat" title="Todavía no cargaste gastos recurrentes." />
        ) : (
          <div className="flex flex-col">
            {upcoming.map((r) => (
              <RecurringRow key={r.id} item={r} categoryName={catById.get(r.categoryId)?.name} currency={currency} locale={locale} />
            ))}
          </div>
        )}
      </Block>

      <RecurringFormSheet open={creating} onClose={() => setCreating(false)} categories={categories} />
    </div>
  );
}

function RecurringRow({
  item,
  categoryName,
  currency,
  locale,
}: {
  item: import("@/lib/types").RecurringTransaction;
  categoryName?: string;
  currency: string;
  locale: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-ink/15">
      <div>
        <p className="font-sans font-bold text-sm">{item.description}</p>
        <p className="font-mono text-[11px] opacity-60">
          {categoryName} · {formatDateShort(item.nextDate)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-display text-lg ${item.type === "expense" ? "text-orange" : "text-lime"}`}>
          {item.type === "expense" ? "−" : "+"}
          {formatMoney(item.amount, currency, locale)}
        </span>
        <button
          onClick={() => deleteRecurring(item.id)}
          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs press-down shadow-hard-sm"
          aria-label="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function RecurringFormSheet({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  categories: import("@/lib/types").Category[];
}) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("monthly");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSubscription, setIsSubscription] = useState(false);

  const relevant = categories.filter((c) => (type === "income" ? c.isIncome : !c.isIncome));

  async function save() {
    const minor = toMinor(parseFloat(amount || "0"));
    if (minor <= 0 || !description || !categoryId) return;
    await addRecurring({
      type,
      amount: minor,
      categoryId,
      description,
      frequency,
      startDate,
      nextDate: startDate,
      isSubscription,
      active: true,
    });
    setAmount("");
    setDescription("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nuevo gasto fijo">
      <div className="flex flex-col gap-4">
        <Segmented
          value={type}
          onChange={setType}
          options={[
            { value: "expense", label: "Gasto" },
            { value: "income", label: "Ingreso" },
          ]}
        />
        <MoneyInput value={amount} onChange={setAmount} autoFocus />
        <Field label="Descripción" required>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Netflix, alquiler, gimnasio…" />
        </Field>
        <Field label="Categoría" required>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Elegir…</option>
            {relevant.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Frecuencia">
          <Segmented
            value={frequency}
            onChange={setFrequency}
            options={[
              { value: "weekly", label: "Semanal" },
              { value: "monthly", label: "Mensual" },
              { value: "yearly", label: "Anual" },
              { value: "custom", label: "Personalizada" },
            ]}
          />
        </Field>
        <Field label="Próximo pago">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>
        <Toggle checked={isSubscription} onChange={setIsSubscription} label="Es una suscripción" />
        <Button full size="lg" onClick={save} disabled={!amount || !description || !categoryId}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}
