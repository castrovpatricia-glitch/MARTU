"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useCategories, useTransactions } from "@/lib/hooks";
import { useSettings } from "@/lib/hooks";
import { useUiStore } from "@/store/uiStore";
import { deleteTransaction, duplicateTransaction } from "@/lib/repo";
import { formatDateFull, formatMoney } from "@/lib/format";
import { monthIdOf, weekStart } from "@/lib/date";
import PageHeader from "@/components/ds/PageHeader";
import Segmented from "@/components/ds/Segmented";
import Input from "@/components/ds/Input";
import Select from "@/components/ds/Select";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import EmptyState from "@/components/ds/EmptyState";
import ConfirmDialog from "@/components/ds/ConfirmDialog";
import type { Transaction } from "@/lib/types";

type ViewFilter = "hoy" | "semana" | "mes" | "anio" | "todo";
type TypeFilter = "all" | "expense" | "income";

export default function MovimientosPage() {
  const settings = useSettings();
  const transactions = useTransactions();
  const categories = useCategories();
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);
  const showToast = useUiStore((s) => s.showToast);

  const [view, setView] = useState<ViewFilter>("mes");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  const filtered = useMemo(() => {
    const now = new Date();
    const todayIso = now.toISOString().slice(0, 10);
    const monthId = monthIdOf(now);
    const wStart = weekStart(now, settings?.weekStartsOn ?? 1);
    const wStartIso = wStart.toISOString().slice(0, 10);
    const yearPrefix = String(now.getFullYear());

    return transactions.filter((t) => {
      if (view === "hoy" && t.date !== todayIso) return false;
      if (view === "semana" && t.date < wStartIso) return false;
      if (view === "mes" && !t.date.startsWith(monthId)) return false;
      if (view === "anio" && !t.date.startsWith(yearPrefix)) return false;
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (categoryId && t.categoryId !== categoryId) return false;
      if (paymentMethod && t.paymentMethod !== paymentMethod) return false;
      if (search) {
        const q = search.toLowerCase();
        const cat = t.categoryId ? catById.get(t.categoryId) : undefined;
        const haystack = `${t.description ?? ""} ${cat?.name ?? ""} ${t.amount / 100}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [transactions, view, typeFilter, categoryId, paymentMethod, search, settings, catById]);

  const grouped = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const t of filtered) {
      const arr = map.get(t.date) ?? [];
      arr.push(t);
      map.set(t.date, arr);
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  if (!settings) return null;
  const { currency, locale } = settings;

  async function handleDuplicate(id: string) {
    await duplicateTransaction(id);
    showToast("Movimiento duplicado ✓");
  }

  async function handleDelete() {
    if (!confirmDeleteId) return;
    await deleteTransaction(confirmDeleteId);
    setConfirmDeleteId(null);
    showToast("Movimiento borrado");
  }

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Todo lo que entra y sale" title="Movimientos" subtitle="the damage, day by day" />

      <div className="px-4 sm:px-6 py-4 border-b border-ink/10 flex flex-col gap-3">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "hoy", label: "Hoy" },
            { value: "semana", label: "Semana" },
            { value: "mes", label: "Mes" },
            { value: "anio", label: "Año" },
            { value: "todo", label: "Todo" },
          ]}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Input placeholder="Buscar…" value={search} onChange={(e) => setSearch(e.target.value)} className="col-span-2 sm:col-span-1" />
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}>
            <option value="all">Todos</option>
            <option value="expense">Gastos</option>
            <option value="income">Ingresos</option>
          </Select>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Medio de pago</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="otro">Otro</option>
          </Select>
        </div>
      </div>

      {grouped.length === 0 && (
        <EmptyState icon="scribble" title="Nada por acá todavía." subtitle="Cambiá los filtros o agregá tu primer movimiento." />
      )}

      <div className="flex flex-col">
        {grouped.map(([date, txs]) => (
          <div key={date} className="border-b border-ink/10">
            <p className="font-mono text-[11px] uppercase tracking-widest px-4 sm:px-6 pt-3 pb-1 opacity-60">
              {formatDateFull(date)}
            </p>
            {txs.map((t) => {
              const cat = t.categoryId ? catById.get(t.categoryId) : undefined;
              const isNegative = t.type === "expense" || (t.type === "saving" && t.direction === "in");
              const label =
                t.description ||
                cat?.name ||
                (t.type === "transfer" ? "Transferencia" : t.type === "saving" ? "Ahorro" : "Movimiento");
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 px-4 sm:px-6 py-3 border-t border-ink/10 first:border-t-0 hover:bg-white/50 group"
                >
                  <button
                    onClick={() => openQuickAdd(t.type, t.id)}
                    className="flex-1 min-w-0 flex items-center gap-3 text-left"
                  >
                    <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-cream">
                      <DoodleIcon name={cat?.icon ?? (t.type === "income" ? "coin" : t.type === "saving" ? "piggy" : "arrow")} size={16} />
                    </span>
                    <span className="min-w-0">
                      <p className="font-sans font-bold text-sm truncate">{label}</p>
                      <p className="font-mono text-[11px] opacity-60 truncate">
                        {cat?.name ?? t.type} {t.paymentMethod ? `· ${t.paymentMethod}` : ""}
                      </p>
                    </span>
                  </button>
                  <span className={`font-display text-lg sm:text-xl whitespace-nowrap ${isNegative ? "text-orange" : ""}`}>
                    {isNegative ? "−" : "+"}
                    {formatMoney(t.amount, currency, locale)}
                  </span>
                  <div className="flex items-center gap-1 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <IconBtn label="Duplicar" onClick={() => handleDuplicate(t.id)}>
                      <DoodleIcon name="repeat" size={14} />
                    </IconBtn>
                    <IconBtn label="Borrar" onClick={() => setConfirmDeleteId(t.id)}>
                      ✕
                    </IconBtn>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(confirmDeleteId)}
        title="¿Borrar movimiento?"
        message="Esta acción no se puede deshacer."
        confirmLabel="Borrar"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-7 h-7 rounded-full bg-white flex items-center justify-center press-down text-xs shadow-hard-sm"
    >
      {children}
    </button>
  );
}
