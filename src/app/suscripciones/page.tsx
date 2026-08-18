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
    <div className="pb-10">
      <PageHeader eyebrow="Todo lo que se renueva solo" title="Suscripciones" subtitle="the subscriptions you forgot about" />

      <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-ink">
        <Block color="blue" shadow="none" className="border-0 sm:border-r-2 border-b-2 sm:border-b-0 border-ink">
          <StatNumber label="Por mes" value={formatMoney(monthlyTotal, currency, locale)} size="xl" />
        </Block>
        <Block color="pink" shadow="none" className="border-0 border-ink">
          <StatNumber label="Por año" value={formatMoney(yearlyTotal, currency, locale)} size="xl" />
        </Block>
      </div>

      {subs.length > 0 && (
        <p className="px-4 sm:px-6 py-4 font-hand text-2xl border-b-2 border-ink">
          Gastás {formatMoney(monthlyTotal, currency, locale)} por mes en suscripciones — eso equivale a{" "}
          {formatMoney(yearlyTotal, currency, locale)} por año.
        </p>
      )}

      <section className="px-4 sm:px-6 py-5">
        {subs.length === 0 ? (
          <EmptyState icon="repeat" title="No tenés suscripciones cargadas." subtitle="Marcá tus gastos fijos como suscripción para verlos acá." />
        ) : (
          <div className="flex flex-col">
            {subs.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 border-b border-ink/15">
                <span className="flex items-center gap-2 font-sans font-bold text-sm">
                  <DoodleIcon name={catById.get(s.categoryId)?.icon ?? "repeat"} size={16} />
                  {s.description}
                </span>
                <span className="font-display text-lg">{formatMoney(s.amount, currency, locale)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
