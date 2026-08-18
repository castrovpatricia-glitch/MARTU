"use client";

import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import {
  addRecurring,
  addTransaction,
  advanceDate,
  deleteTransaction,
  updateTransaction,
} from "@/lib/repo";
import { useActiveCategories, useAccounts, useCreditCards, useSavingsGoals, useSettings } from "@/lib/hooks";
import { toMinor, toMajor, todayIso } from "@/lib/format";
import type { PaymentMethod, RecurrenceFrequency, SavingDirection, Transaction, TransactionType } from "@/lib/types";
import { useUiStore } from "@/store/uiStore";
import CategoryPicker from "./CategoryPicker";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import Select from "@/components/ds/Select";
import Segmented from "@/components/ds/Segmented";
import MoneyInput from "@/components/ds/MoneyInput";
import Toggle from "@/components/ds/Toggle";
import Button from "@/components/ds/Button";

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "debito", label: "Débito" },
  { value: "credito", label: "Crédito" },
  { value: "efectivo", label: "Efectivo" },
  { value: "transferencia", label: "Transferencia" },
  { value: "otro", label: "Otro" },
];

const FREQUENCIES: { value: RecurrenceFrequency; label: string }[] = [
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensual" },
  { value: "yearly", label: "Anual" },
  { value: "custom", label: "Personalizada" },
];

export default function TransactionForm({
  type,
  editId,
  onDone,
}: {
  type: TransactionType;
  editId: string | null;
  onDone: () => void;
}) {
  const settings = useSettings();
  const allCategories = useActiveCategories();
  const accounts = useAccounts();
  const creditCards = useCreditCards();
  const goals = useSavingsGoals();
  const showToast = useUiStore((s) => s.showToast);

  const existing = useLiveQuery(() => (editId ? db.transactions.get(editId) : undefined), [editId]);

  const categories = useMemo(
    () => allCategories.filter((c) => (type === "income" ? c.isIncome : !c.isIncome)),
    [allCategories, type]
  );

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState(todayIso());
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("debito");
  const [accountId, setAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [tags, setTags] = useState("");
  const [creditCardId, setCreditCardId] = useState<string>("");
  const [direction, setDirection] = useState<SavingDirection>("in");
  const [savingsGoalId, setSavingsGoalId] = useState<string>("");
  const [showMore, setShowMore] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("monthly");

  useEffect(() => {
    if (!existing) return;
    setAmount(String(toMajor(existing.amount)));
    setCategoryId(existing.categoryId);
    setDate(existing.date);
    setDescription(existing.description ?? "");
    setPaymentMethod(existing.paymentMethod ?? "debito");
    setAccountId(existing.accountId ?? "");
    setToAccountId(existing.toAccountId ?? "");
    setTags((existing.tags ?? []).join(", "));
    setCreditCardId(existing.creditCardId ?? "");
    setDirection(existing.direction ?? "in");
    setSavingsGoalId(existing.savingsGoalId ?? "");
  }, [existing]);

  useEffect(() => {
    if (!categoryId && categories.length > 0 && !existing) setCategoryId(categories[0].id);
  }, [categories, categoryId, existing]);

  const currency = settings?.currency ?? "ARS";

  const canSave =
    parseFloat(amount || "0") > 0 &&
    (type === "transfer" || type === "saving" ? true : Boolean(categoryId));

  async function handleSubmit() {
    const minor = toMinor(parseFloat(amount || "0"));
    if (minor <= 0) return;

    const base: Omit<Transaction, "id" | "createdAt" | "updatedAt"> = {
      type,
      amount: minor,
      date,
      description: description || undefined,
      tags: tags
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : undefined,
    };

    if (type === "expense" || type === "income") {
      base.categoryId = categoryId;
      base.paymentMethod = paymentMethod;
      base.accountId = accountId || undefined;
      if (type === "expense") {
        base.isCreditCard = paymentMethod === "credito";
        base.creditCardId = paymentMethod === "credito" ? creditCardId || undefined : undefined;
      }
    } else if (type === "transfer") {
      base.accountId = accountId || undefined;
      base.toAccountId = toAccountId || undefined;
    } else if (type === "saving") {
      base.direction = direction;
      base.savingsGoalId = savingsGoalId || undefined;
      base.accountId = accountId || undefined;
    }

    if (editId) {
      await updateTransaction(editId, base);
      showToast("Movimiento actualizado ✓");
      onDone();
      return;
    }

    const created = await addTransaction(base);

    if (isRecurring && (type === "expense" || type === "income") && categoryId) {
      await addRecurring({
        type,
        amount: minor,
        categoryId,
        description: description || (type === "expense" ? "Gasto recurrente" : "Ingreso recurrente"),
        frequency,
        startDate: date,
        nextDate: advanceDate(date, frequency),
        accountId: accountId || undefined,
        paymentMethod: type === "expense" ? paymentMethod : undefined,
        isSubscription: false,
        active: true,
      });
    }

    onDone();
    showToast(
      type === "expense"
        ? "Gasto agregado ✓"
        : type === "income"
        ? "Ingreso agregado ✓"
        : type === "saving"
        ? "Ahorro registrado ✓"
        : "Transferencia registrada ✓",
      async () => {
        await deleteTransaction(created.id);
      }
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <MoneyInput value={amount} onChange={setAmount} currencySymbol={currencySymbolFor(currency)} autoFocus />

      {(type === "expense" || type === "income") && (
        <Field label="Categoría" required>
          <CategoryPicker categories={categories} value={categoryId} onChange={setCategoryId} />
        </Field>
      )}

      {type === "saving" && (
        <Field label="Dirección" required>
          <Segmented
            value={direction}
            onChange={setDirection}
            options={[
              { value: "in", label: "Depositar" },
              { value: "out", label: "Retirar" },
            ]}
          />
        </Field>
      )}

      {type === "saving" && goals.length > 0 && (
        <Field label="Meta (opcional)">
          <Select value={savingsGoalId} onChange={(e) => setSavingsGoalId(e.target.value)}>
            <option value="">Sin asignar</option>
            {goals.filter((g) => !g.archived).map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Select>
        </Field>
      )}

      {type === "transfer" && accounts.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Desde">
            <Select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              <option value="">—</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Hacia">
            <Select value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
              <option value="">—</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      )}
      {type === "transfer" && accounts.length === 0 && (
        <p className="font-mono text-xs opacity-60">
          Podés crear cuentas en Ajustes para llevar el detalle de las transferencias. No es obligatorio.
        </p>
      )}

      <Field label="Fecha" required>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="font-mono text-xs uppercase tracking-wide underline underline-offset-2 self-start"
      >
        {showMore ? "Ocultar detalles" : "Más detalles (opcional)"}
      </button>

      {showMore && (
        <div className="flex flex-col gap-4 border-t-2 border-ink/15 pt-4">
          <Field label="Descripción">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === "income" ? "Ej: aguinaldo, bono" : "Ej: café con Lu"}
            />
          </Field>

          {(type === "expense" || type === "income") && (
            <Field label="Medio de pago">
              <Segmented value={paymentMethod} onChange={setPaymentMethod} options={PAYMENT_METHODS} />
            </Field>
          )}

          {type === "expense" && paymentMethod === "credito" && creditCards.length > 0 && (
            <Field label="Tarjeta">
              <Select value={creditCardId} onChange={(e) => setCreditCardId(e.target.value)}>
                <option value="">Sin especificar</option>
                {creditCards.filter((c) => !c.archived).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          {accounts.length > 0 && type !== "transfer" && (
            <Field label="Cuenta">
              <Select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                <option value="">Sin especificar</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          <Field label="Etiquetas">
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="separadas, por, coma" />
          </Field>

          {(type === "expense" || type === "income") && !editId && (
            <div className="flex flex-col gap-3 border-t-2 border-ink/15 pt-4">
              <Toggle checked={isRecurring} onChange={setIsRecurring} label="¿Es recurrente?" />
              {isRecurring && (
                <Field label="Frecuencia">
                  <Segmented value={frequency} onChange={setFrequency} options={FREQUENCIES} />
                </Field>
              )}
            </div>
          )}
        </div>
      )}

      <Button size="lg" full disabled={!canSave} onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
}

function currencySymbolFor(currency: string): string {
  try {
    const parts = new Intl.NumberFormat("es-AR", { style: "currency", currency }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? "$";
  } catch {
    return "$";
  }
}
