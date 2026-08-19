"use client";

import { useState } from "react";
import { useInvestmentMovements, useInvestments, useSettings } from "@/lib/hooks";
import { addInvestment, addInvestmentMovement, deleteInvestment, updateInvestment } from "@/lib/repo";
import { computeInvestmentStats, computeTotalDollarsHeld } from "@/lib/calc";
import { formatMoney, todayIso, toMajor, toMinor } from "@/lib/format";
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
import EmptyState from "@/components/ds/EmptyState";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PALETTE_COLORS } from "@/components/ds/palette";
import type { InvestmentKind, PaletteColor } from "@/lib/types";

const KIND_LABELS: Record<InvestmentKind, string> = {
  dolares: "Dólares",
  plazo_fijo: "Plazo fijo",
  acciones: "Acciones",
  cripto: "Cripto",
  fondo: "Fondo",
  otro: "Otro",
};

export default function InversionesPage() {
  const settings = useSettings();
  const investments = useInvestments().filter((i) => !i.archived);
  const movements = useInvestmentMovements();
  const [buyingDollars, setBuyingDollars] = useState(false);
  const [creatingInvestment, setCreatingInvestment] = useState(false);
  const [addingMovementFor, setAddingMovementFor] = useState<string | null>(null);
  const [editingValueFor, setEditingValueFor] = useState<string | null>(null);

  const dollarInvestments = investments.filter((i) => i.kind === "dolares");
  const otherInvestments = investments.filter((i) => i.kind !== "dolares");

  const totalDollars = computeTotalDollarsHeld(investments, movements);
  const dollarMovements = movements.filter((m) => dollarInvestments.some((d) => d.id === m.investmentId));

  if (!settings) return null;
  const { currency, locale } = settings;

  return (
    <div className="pb-10 px-4 sm:px-6 pt-4 flex flex-col gap-4">
      <PageHeader eyebrow="Dólares, plazo fijo y demás" title="Inversiones" subtitle="put your money to work" />

      <Block color="blue" shadow="sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <StatNumber label="Ahorro en dólares" value={formatMoney(totalDollars, "USD", locale)} size="xl" />
          <Button color="ink" onClick={() => setBuyingDollars(true)}>
            + Comprar dólares
          </Button>
        </div>
      </Block>

      <Block color="white" shadow="sm">
        <h2 className="font-hand text-3xl mb-3">Compras de dólares</h2>
        {dollarMovements.length === 0 ? (
          <EmptyState icon="coin" title="Todavía no compraste dólares." subtitle="Registrá tu primera compra para ver la evolución." />
        ) : (
          <div className="flex flex-col">
            {dollarMovements.map((m) => {
              const rate = m.amountForeign ? toMajor(m.amountLocal) / toMajor(m.amountForeign) : undefined;
              return (
                <div key={m.id} className="flex items-center justify-between py-3 border-b border-ink/8 last:border-b-0">
                  <div>
                    <p className="font-sans font-bold text-sm">
                      {m.direction === "buy" ? "Compra" : "Venta"} · {m.date}
                    </p>
                    <p className="font-mono text-[11px] opacity-60">
                      {formatMoney(m.amountLocal, currency, locale)} {rate ? `· $${rate.toFixed(2)} ${currency}/USD` : ""}
                    </p>
                  </div>
                  <span className="font-display font-bold text-lg">
                    {m.direction === "buy" ? "+" : "−"}
                    {formatMoney(m.amountForeign ?? 0, "USD", locale)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Block>

      <div className="flex items-center justify-between">
        <h2 className="font-hand text-3xl">Plata invertida</h2>
        <Button size="sm" onClick={() => setCreatingInvestment(true)}>
          + Nueva inversión
        </Button>
      </div>

      {otherInvestments.length === 0 ? (
        <Block color="white" shadow="sm">
          <EmptyState icon="target" title="No tenés otras inversiones cargadas." subtitle="Plazo fijo, acciones, cripto, fondos — lo que sea." />
        </Block>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {otherInvestments.map((inv) => {
            const stats = computeInvestmentStats(inv, movements);
            return (
              <Block key={inv.id} color={inv.color} shadow="sm" className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display font-bold text-xl">
                    <DoodleIcon name="piggy" size={18} /> {inv.name}
                  </span>
                  <button onClick={() => deleteInvestment(inv.id)} className="font-mono text-xs opacity-60 underline">
                    borrar
                  </button>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wide opacity-60">{KIND_LABELS[inv.kind]}</p>
                <div className="flex justify-between font-mono text-xs">
                  <span>Invertido: {formatMoney(stats.investedLocal, currency, locale)}</span>
                  <span>Valor actual: {formatMoney(stats.currentValue, currency, locale)}</span>
                </div>
                <p className={`font-display font-bold text-lg ${stats.gain >= 0 ? "text-lime" : "text-orange"}`}>
                  {stats.gain >= 0 ? "+" : ""}
                  {formatMoney(stats.gain, currency, locale)}
                </p>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" variant="outline" onClick={() => setAddingMovementFor(inv.id)}>
                    + Movimiento
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingValueFor(inv.id)}>
                    Actualizar valor
                  </Button>
                </div>
              </Block>
            );
          })}
        </div>
      )}

      <BuyDollarsSheet
        open={buyingDollars}
        onClose={() => setBuyingDollars(false)}
        existingId={dollarInvestments[0]?.id}
        currency={currency}
      />
      <NewInvestmentSheet open={creatingInvestment} onClose={() => setCreatingInvestment(false)} />
      {addingMovementFor && (
        <MovementSheet investmentId={addingMovementFor} currency={currency} onClose={() => setAddingMovementFor(null)} />
      )}
      {editingValueFor && (
        <ValueSheet
          investment={otherInvestments.find((i) => i.id === editingValueFor)!}
          onClose={() => setEditingValueFor(null)}
        />
      )}
    </div>
  );
}

function BuyDollarsSheet({
  open,
  onClose,
  existingId,
  currency,
}: {
  open: boolean;
  onClose: () => void;
  existingId?: string;
  currency: string;
}) {
  const [amountLocal, setAmountLocal] = useState("");
  const [amountForeign, setAmountForeign] = useState("");
  const [date, setDate] = useState(todayIso());

  async function save() {
    const local = toMinor(parseFloat(amountLocal || "0"));
    const foreign = toMinor(parseFloat(amountForeign || "0"));
    if (local <= 0 || foreign <= 0) return;
    let investmentId = existingId;
    if (!investmentId) {
      const created = await addInvestment({ name: "Dólares", kind: "dolares", color: "blue" });
      investmentId = created.id;
    }
    await addInvestmentMovement({ investmentId, direction: "buy", amountLocal: local, amountForeign: foreign, date });
    setAmountLocal("");
    setAmountForeign("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Comprar dólares" color="bg-blue">
      <div className="flex flex-col gap-4">
        <Field label={`Pagaste (${currency})`} required>
          <MoneyInput value={amountLocal} onChange={setAmountLocal} autoFocus />
        </Field>
        <Field label="Compraste (USD)" required>
          <MoneyInput value={amountForeign} onChange={setAmountForeign} currencySymbol="US$" />
        </Field>
        <Field label="Fecha">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Button full size="lg" onClick={save} disabled={!amountLocal || !amountForeign}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}

function NewInvestmentSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [kind, setKind] = useState<InvestmentKind>("plazo_fijo");
  const [initialAmount, setInitialAmount] = useState("");
  const [color, setColor] = useState<PaletteColor>("mint");

  async function save() {
    if (!name) return;
    const created = await addInvestment({ name, kind, color });
    const initial = toMinor(parseFloat(initialAmount || "0"));
    if (initial > 0) {
      await addInvestmentMovement({ investmentId: created.id, direction: "buy", amountLocal: initial, date: todayIso() });
    }
    setName("");
    setInitialAmount("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva inversión">
      <div className="flex flex-col gap-4">
        <Field label="Nombre" required>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Plazo fijo Banco X" />
        </Field>
        <Field label="Tipo">
          <Select value={kind} onChange={(e) => setKind(e.target.value as InvestmentKind)}>
            <option value="plazo_fijo">Plazo fijo</option>
            <option value="acciones">Acciones</option>
            <option value="cripto">Cripto</option>
            <option value="fondo">Fondo</option>
            <option value="otro">Otro</option>
          </Select>
        </Field>
        <Field label="Monto inicial invertido (opcional)">
          <MoneyInput value={initialAmount} onChange={setInitialAmount} />
        </Field>
        <Field label="Color">
          <div className="flex gap-2 flex-wrap">
            {PALETTE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${color === c ? "shadow-hard-sm ring-2 ring-ink ring-offset-2 ring-offset-white" : ""}`}
                style={{ backgroundColor: `var(--color-${c})` }}
                aria-label={c}
              />
            ))}
          </div>
        </Field>
        <Button full size="lg" onClick={save} disabled={!name}>
          Crear
        </Button>
      </div>
    </Sheet>
  );
}

function MovementSheet({ investmentId, currency, onClose }: { investmentId: string; currency: string; onClose: () => void }) {
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayIso());

  async function save() {
    const minor = toMinor(parseFloat(amount || "0"));
    if (minor <= 0) return;
    await addInvestmentMovement({ investmentId, direction, amountLocal: minor, date });
    setAmount("");
    onClose();
  }

  return (
    <Sheet open onClose={onClose} title="Movimiento">
      <div className="flex flex-col gap-4">
        <Segmented
          value={direction}
          onChange={setDirection}
          options={[
            { value: "buy", label: "Aporte" },
            { value: "sell", label: "Retiro" },
          ]}
        />
        <Field label={`Monto (${currency})`} required>
          <MoneyInput value={amount} onChange={setAmount} autoFocus />
        </Field>
        <Field label="Fecha">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Button full size="lg" onClick={save} disabled={!amount}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}

function ValueSheet({ investment, onClose }: { investment: { id: string; name: string; currentValue?: number }; onClose: () => void }) {
  const [value, setValue] = useState(investment.currentValue ? String(toMajor(investment.currentValue)) : "");

  async function save() {
    const minor = toMinor(parseFloat(value || "0"));
    await updateInvestment(investment.id, { currentValue: minor > 0 ? minor : undefined });
    onClose();
  }

  return (
    <Sheet open onClose={onClose} title={`Valor actual de ${investment.name}`}>
      <div className="flex flex-col gap-4">
        <MoneyInput value={value} onChange={setValue} autoFocus />
        <Button full size="lg" onClick={save}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}
