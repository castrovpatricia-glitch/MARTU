"use client";

import { useState } from "react";
import { useSavingsGoals } from "@/lib/hooks";
import { addSavingsGoal, deleteSavingsGoal, updateSavingsGoal } from "@/lib/repo";
import { formatMoney, formatPercent, toMinor } from "@/lib/format";
import { parseIsoDate } from "@/lib/date";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import ProgressBar from "@/components/ds/ProgressBar";
import Button from "@/components/ds/Button";
import Sheet from "@/components/ds/Sheet";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import MoneyInput from "@/components/ds/MoneyInput";
import Select from "@/components/ds/Select";
import EmptyState from "@/components/ds/EmptyState";
import ConfirmDialog from "@/components/ds/ConfirmDialog";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PALETTE_COLORS } from "@/components/ds/palette";
import type { PaletteColor } from "@/lib/types";

const CURRENCIES = ["ARS", "USD", "EUR", "MXN", "CLP", "COP", "UYU", "PEN", "BRL", "GBP"];

// Computed once at module load (not during render) so the purity rule for
// components doesn't flag it — a goal countdown doesn't need per-render freshness.
const NOW_MS = Date.now();

export default function MetasPage() {
  const goals = useSavingsGoals().filter((g) => !g.archived);
  const [creating, setCreating] = useState(false);
  const [contributing, setContributing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Ponele nombre a tus sueños" title="Metas" subtitle="wish list, but with numbers" />

      <div className="px-4 sm:px-6 py-5">
        <Button onClick={() => setCreating(true)}>+ Nueva meta</Button>
      </div>

      {goals.length === 0 ? (
        <EmptyState icon="target" title="Todavía no tenés metas de ahorro." subtitle="Un viaje, un fondo, lo que sea. Ponele nombre y número." />
      ) : (
        <div className="px-4 sm:px-6 grid sm:grid-cols-2 gap-4 pb-6">
          {goals.map((goal) => {
            const pct = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
            const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
            const monthsLeft = goal.targetDate
              ? Math.max(
                  1,
                  Math.round(
                    (parseIsoDate(goal.targetDate).getTime() - NOW_MS) / (1000 * 60 * 60 * 24 * 30.4)
                  )
                )
              : undefined;
            const perMonth = monthsLeft ? remaining / monthsLeft : undefined;
            return (
              <Block key={goal.id} color={goal.color} shadow="md" className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display text-2xl uppercase">
                    <DoodleIcon name="star" size={20} /> {goal.name}
                  </span>
                  <button onClick={() => setDeleting(goal.id)} className="font-mono text-xs opacity-60 underline">
                    borrar
                  </button>
                </div>
                <ProgressBar pct={pct} height="h-6" />
                <div className="flex justify-between font-mono text-xs">
                  <span>
                    Meta: {formatMoney(goal.targetAmount, goal.currency)} · {formatPercent(pct)}
                  </span>
                </div>
                <p className="font-mono text-xs">
                  Ahorrado: {formatMoney(goal.savedAmount, goal.currency)} — Faltan: {formatMoney(remaining, goal.currency)}
                </p>
                {perMonth !== undefined && perMonth > 0 && (
                  <p className="font-mono text-xs bg-white/60 border-2 border-ink px-2 py-1.5">
                    Necesitás ahorrar ~{formatMoney(Math.round(perMonth), goal.currency)}/mes para llegar a tiempo.
                  </p>
                )}
                <Button size="sm" variant="outline" onClick={() => setContributing(goal.id)}>
                  + Sumar ahorro
                </Button>
              </Block>
            );
          })}
        </div>
      )}

      <GoalFormSheet open={creating} onClose={() => setCreating(false)} />
      {contributing && (
        <ContributeSheet goalId={contributing} onClose={() => setContributing(null)} />
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title="¿Borrar meta?"
        message="Se archiva la meta y deja de mostrarse acá."
        confirmLabel="Borrar"
        onConfirm={async () => {
          if (deleting) await deleteSavingsGoal(deleting);
          setDeleting(null);
        }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

function GoalFormSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [targetDate, setTargetDate] = useState("");
  const [color, setColor] = useState<PaletteColor>("blue");

  async function save() {
    if (!name || !target) return;
    await addSavingsGoal({
      name,
      targetAmount: toMinor(parseFloat(target || "0")),
      savedAmount: toMinor(parseFloat(saved || "0")),
      currency,
      targetDate: targetDate || undefined,
      color,
    });
    setName("");
    setTarget("");
    setSaved("");
    setTargetDate("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva meta">
      <div className="flex flex-col gap-4">
        <Field label="Nombre" required>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Viaje a Japón" />
        </Field>
        <Field label="Moneda">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Monto objetivo" required>
          <MoneyInput value={target} onChange={setTarget} />
        </Field>
        <Field label="Ya ahorrado">
          <MoneyInput value={saved} onChange={setSaved} />
        </Field>
        <Field label="Fecha objetivo">
          <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </Field>
        <Field label="Color">
          <div className="flex gap-2 flex-wrap">
            {PALETTE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 border-2 border-ink ${color === c ? "shadow-hard-sm" : ""}`}
                style={{ backgroundColor: `var(--color-${c})` }}
                aria-label={c}
              />
            ))}
          </div>
        </Field>
        <Button full size="lg" onClick={save} disabled={!name || !target}>
          Crear meta
        </Button>
      </div>
    </Sheet>
  );
}

function ContributeSheet({ goalId, onClose }: { goalId: string; onClose: () => void }) {
  const goals = useSavingsGoals();
  const goal = goals.find((g) => g.id === goalId);
  const [amount, setAmount] = useState("");

  async function save() {
    if (!goal) return;
    const value = toMinor(parseFloat(amount || "0"));
    if (value <= 0) return;
    await updateSavingsGoal(goal.id, { savedAmount: goal.savedAmount + value });
    setAmount("");
    onClose();
  }

  if (!goal) return null;

  return (
    <Sheet open={Boolean(goalId)} onClose={onClose} title={`Sumar a ${goal.name}`}>
      <div className="flex flex-col gap-4">
        <MoneyInput value={amount} onChange={setAmount} autoFocus />
        <p className="font-mono text-xs opacity-60">
          Llevás {formatMoney(goal.savedAmount, goal.currency)} de {formatMoney(goal.targetAmount, goal.currency)}.
        </p>
        <Button full size="lg" onClick={save}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}
