"use client";

import { useState } from "react";
import { useCreditCards, useSettings, useTransactions } from "@/lib/hooks";
import { addCreditCard, deleteCreditCard } from "@/lib/repo";
import { currentCardCycleTotal } from "@/lib/calc";
import { formatMoney } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import Button from "@/components/ds/Button";
import Sheet from "@/components/ds/Sheet";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import EmptyState from "@/components/ds/EmptyState";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PALETTE_COLORS } from "@/components/ds/palette";
import type { PaletteColor } from "@/lib/types";

export default function TarjetasPage() {
  const settings = useSettings();
  const cards = useCreditCards().filter((c) => !c.archived);
  const transactions = useTransactions();
  const [creating, setCreating] = useState(false);

  if (!settings) return null;
  const { currency, locale } = settings;

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Lo que ya gastaste (pero pagás después)" title="Tarjetas" subtitle="buy now, cry later" />

      <div className="px-4 sm:px-6 py-5 border-b border-ink/10">
        <Button onClick={() => setCreating(true)}>+ Nueva tarjeta</Button>
      </div>

      <section className="px-4 sm:px-6 py-5">
        {cards.length === 0 ? (
          <EmptyState icon="card" title="No cargaste tarjetas todavía." subtitle="Registralas para ver qué entra en el resumen actual y qué en el próximo." />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card) => {
              const { cycle, total, nextCycleTotal } = currentCardCycleTotal(card, transactions);
              return (
                <Block key={card.id} color={card.color} shadow="md" className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-display text-2xl">
                      <DoodleIcon name="card" size={20} /> {card.name}
                    </span>
                    <button onClick={() => deleteCreditCard(card.id)} className="font-mono text-xs opacity-60 underline">
                      borrar
                    </button>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wide opacity-70">
                    Cierra el {card.closingDay} · vence el {card.dueDay}
                  </p>
                  <div>
                    <p className="font-mono text-[11px] uppercase opacity-60">Consumos de la tarjeta</p>
                    <p className="font-display text-3xl">{formatMoney(total, currency, locale)}</p>
                    <p className="font-mono text-[11px] opacity-60">período {cycle.cycleStart} → {cycle.cycleEnd}</p>
                  </div>
                  {nextCycleTotal > 0 && (
                    <p className="font-mono text-xs bg-white/70 rounded-xl px-3 py-2">
                      Ya vas acumulando {formatMoney(nextCycleTotal, currency, locale)} para el próximo resumen.
                    </p>
                  )}
                </Block>
              );
            })}
          </div>
        )}
      </section>

      <CardFormSheet open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}

function CardFormSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [closingDay, setClosingDay] = useState("22");
  const [dueDay, setDueDay] = useState("5");
  const [color, setColor] = useState<PaletteColor>("orange");

  async function save() {
    if (!name) return;
    await addCreditCard({
      name,
      closingDay: parseInt(closingDay || "1", 10),
      dueDay: parseInt(dueDay || "1", 10),
      color,
    });
    setName("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva tarjeta">
      <div className="flex flex-col gap-4">
        <Field label="Nombre" required>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Visa Signature" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Día de cierre" required>
            <Input type="number" min={1} max={28} value={closingDay} onChange={(e) => setClosingDay(e.target.value)} />
          </Field>
          <Field label="Día de vencimiento" required>
            <Input type="number" min={1} max={28} value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
          </Field>
        </div>
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
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}
