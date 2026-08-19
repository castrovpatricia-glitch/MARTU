"use client";

import { useRecurring, useCategories, useSettings } from "@/lib/hooks";
import { formatMoney } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";
import Block from "@/components/ds/Block";
import StatNumber from "@/components/ds/StatNumber";
import EmptyState from "@/components/ds/EmptyState";
import DoodleIcon from "@/components/doodles/DoodleIcon";

export default function SuscripcionesPage() {
  const settings = useSettings();
  const recurring = useRecurring();
  const categories = useCategories();
  const catById = new Map(categories.map((c) => [c.id, c]));

  const subs = recurring.filter((r) => r.active && r.isSubscription);
  const monthlyTotal = subs.reduce((s, r) => s + (r.frequency === "yearly" ? r.amount / 12 : r.amount), 0);
  const yearlyTotal = monthlyTotal * 12;

  if (!settings) return null;
  const { currency, locale } = settings;

  return (
    <div className="pb-10 px-4 sm:px-6 pt-4 flex flex-col gap-4">
      <PageHeader eyebrow="Todo lo que se renueva solo" title="Suscripciones" subtitle="the subscriptions you forgot about" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Block color="blue" shadow="sm">
          <StatNumber label="Por mes" value={formatMoney(monthlyTotal, currency, locale)} size="xl" />
        </Block>
        <Block color="pink" shadow="sm">
          <StatNumber label="Por año" value={formatMoney(yearlyTotal, currency, locale)} size="xl" />
        </Block>
      </div>

      {subs.length > 0 && (
        <Block color="cream" shadow="sm">
          <p className="font-hand text-2xl">
            Gastás {formatMoney(monthlyTotal, currency, locale)} por mes en suscripciones — eso equivale a{" "}
            {formatMoney(yearlyTotal, currency, locale)} por año.
          </p>
        </Block>
      )}

      <Block color="white" shadow="sm">
        {subs.length === 0 ? (
          <EmptyState icon="repeat" title="No tenés suscripciones cargadas." subtitle="Marcá tus gastos fijos como suscripción para verlos acá." />
        ) : (
          <div className="flex flex-col">
            {subs.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 border-b border-ink/8 last:border-b-0">
                <span className="flex items-center gap-2 font-sans font-bold text-sm">
                  <DoodleIcon name={catById.get(s.categoryId)?.icon ?? "repeat"} size={16} />
                  {s.description}
                </span>
                <span className="font-display font-bold text-lg">{formatMoney(s.amount, currency, locale)}</span>
              </div>
            ))}
          </div>
        )}
      </Block>
    </div>
  );
}
