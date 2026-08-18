"use client";

import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccounts, useCategories, useSettings } from "@/lib/hooks";
import {
  addAccount,
  addCategory,
  deleteAccount,
  deleteCategory,
  reorderCategories,
  resetAllData,
  updateCategory,
  updateSettings,
} from "@/lib/repo";
import { buildFullBackup, downloadJson, exportTransactionsCsv, restoreFromBackup, type FullBackup } from "@/lib/exportImport";
import { useTransactions } from "@/lib/hooks";
import { toMajor, toMinor } from "@/lib/format";
import PageHeader from "@/components/ds/PageHeader";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import Select from "@/components/ds/Select";
import Segmented from "@/components/ds/Segmented";
import MoneyInput from "@/components/ds/MoneyInput";
import Button from "@/components/ds/Button";
import Sheet from "@/components/ds/Sheet";
import ConfirmDialog from "@/components/ds/ConfirmDialog";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { PALETTE_BG, PALETTE_COLORS } from "@/components/ds/palette";
import type { AccountKind, Category, PaletteColor } from "@/lib/types";
import { DOODLE_ICON_NAMES } from "@/components/doodles/iconNames";

const CURRENCIES = ["ARS", "USD", "EUR", "MXN", "CLP", "COP", "UYU", "PEN", "BRL", "GBP"];

export default function AjustesPage() {
  const settings = useSettings();
  const categories = useCategories();
  const accounts = useAccounts();
  const transactions = useTransactions();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [creatingCategory, setCreatingCategory] = useState<"expense" | "income" | null>(null);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!settings) return null;

  const expenseCats = categories.filter((c) => !c.isIncome && !c.archived).sort((a, b) => a.order - b.order);
  const incomeCats = categories.filter((c) => c.isIncome && !c.archived).sort((a, b) => a.order - b.order);

  function move(list: Category[], id: string, dir: -1 | 1) {
    const idx = list.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= list.length) return;
    const reordered = [...list];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    reorderCategories(reordered.map((c) => c.id));
  }

  async function handleExportJson() {
    const backup = await buildFullBackup();
    downloadJson(backup);
  }

  function handleExportCsv() {
    exportTransactionsCsv(transactions, categories, settings!.currency, settings!.locale);
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const backup = JSON.parse(text) as FullBackup;
      if (!backup.version) throw new Error("Archivo inválido");
      await restoreFromBackup(backup);
      setImportError(null);
      router.refresh();
    } catch {
      setImportError("No pudimos leer ese archivo. ¿Es un backup de MARTU?");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleReset() {
    await resetAllData();
    setConfirmReset(false);
    router.replace("/onboarding");
  }

  return (
    <div className="pb-16">
      <PageHeader eyebrow="Todo lo demás" title="Ajustes" subtitle="the fine print" />

      <SectionBlock title="General">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Moneda">
            <Select value={settings.currency} onChange={(e) => updateSettings({ currency: e.target.value })}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Primer día de la semana">
            <Segmented
              value={String(settings.weekStartsOn) as "0" | "1"}
              onChange={(v) => updateSettings({ weekStartsOn: Number(v) as 0 | 1 })}
              options={[
                { value: "1", label: "Lunes" },
                { value: "0", label: "Domingo" },
              ]}
            />
          </Field>
          <Field label="Día de cobro">
            <Input
              type="number"
              min={1}
              max={31}
              value={settings.payday}
              onChange={(e) => updateSettings({ payday: parseInt(e.target.value || "1", 10) })}
            />
          </Field>
          <Field label="Objetivo principal">
            <Segmented
              value={settings.mainGoal}
              onChange={(v) => updateSettings({ mainGoal: v as typeof settings.mainGoal })}
              options={[
                { value: "ahorrar", label: "Ahorrar" },
                { value: "controlar", label: "Controlar" },
                { value: "ambas", label: "Ambas" },
              ]}
            />
          </Field>
          <Field label="Meta de ahorro mensual">
            <MoneyInput
              value={String(toMajor(settings.monthlySavingsTarget))}
              onChange={(v) => updateSettings({ monthlySavingsTarget: toMinor(parseFloat(v || "0")) })}
            />
          </Field>
          <Field label="Cómo mostrar los números">
            <Segmented
              value={settings.numberDisplayMode}
              onChange={(v) => updateSettings({ numberDisplayMode: v as typeof settings.numberDisplayMode })}
              options={[
                { value: "full", label: "Completo" },
                { value: "compact", label: "Compacto" },
              ]}
            />
          </Field>
        </div>
      </SectionBlock>

      <SectionBlock title="Categorías de gasto" action={<Button size="sm" onClick={() => setCreatingCategory("expense")}>+ Nueva</Button>}>
        <CategoryList categories={expenseCats} onEdit={setEditingCategory} onMove={(id, dir) => move(expenseCats, id, dir)} />
      </SectionBlock>

      <SectionBlock title="Categorías de ingreso" action={<Button size="sm" onClick={() => setCreatingCategory("income")}>+ Nueva</Button>}>
        <CategoryList categories={incomeCats} onEdit={setEditingCategory} onMove={(id, dir) => move(incomeCats, id, dir)} />
      </SectionBlock>

      <SectionBlock title="Cuentas" action={<Button size="sm" onClick={() => setCreatingAccount(true)}>+ Nueva</Button>}>
        {accounts.filter((a) => !a.archived).length === 0 ? (
          <p className="font-mono text-xs opacity-60">
            Opcional: separá tu plata en banco, billetera, efectivo. Si no las usás, no pasa nada.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {accounts.filter((a) => !a.archived).map((a) => (
              <div key={a.id} className={`flex items-center justify-between border-2 border-ink px-3 py-2 ${PALETTE_BG[a.color]}`}>
                <span className="font-sans font-bold text-sm">{a.name}</span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase">{a.kind}</span>
                  <button onClick={() => deleteAccount(a.id)} className="font-mono text-xs underline">
                    borrar
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionBlock>

      <SectionBlock title="Tarjetas de crédito">
        <Link href="/tarjetas">
          <Button variant="outline">Administrar tarjetas →</Button>
        </Link>
      </SectionBlock>

      <SectionBlock title="Tus datos">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExportCsv}>
              Exportar CSV
            </Button>
            <Button variant="outline" onClick={handleExportJson}>
              Exportar backup (JSON)
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Importar backup
            </Button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
          </div>
          {importError && <p className="font-mono text-xs text-orange">{importError}</p>}
        </div>
      </SectionBlock>

      <SectionBlock title="Zona de peligro">
        <Button color="orange" onClick={() => setConfirmReset(true)}>
          Resetear aplicación
        </Button>
        <p className="font-mono text-[11px] opacity-60 mt-2">Borra todos tus datos locales. No se puede deshacer — hacé un backup antes.</p>
      </SectionBlock>

      <CategoryFormSheet
        open={Boolean(creatingCategory)}
        isIncome={creatingCategory === "income"}
        onClose={() => setCreatingCategory(null)}
      />
      {editingCategory && (
        <CategoryEditSheet category={editingCategory} onClose={() => setEditingCategory(null)} />
      )}
      <AccountFormSheet open={creatingAccount} onClose={() => setCreatingAccount(false)} />

      <ConfirmDialog
        open={confirmReset}
        title="¿Resetear todo?"
        message="Se borran todos los movimientos, categorías, metas y configuración de este dispositivo."
        confirmLabel="Sí, borrar todo"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}

function SectionBlock({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="px-4 sm:px-6 py-5 border-b-2 border-ink">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-hand text-3xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CategoryList({
  categories,
  onEdit,
  onMove,
}: {
  categories: Category[];
  onEdit: (c: Category) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((c) => (
        <div key={c.id} className={`flex items-center justify-between border-2 border-ink px-3 py-2 ${PALETTE_BG[c.color]}`}>
          <button onClick={() => onEdit(c)} className="flex items-center gap-2 font-sans font-bold text-sm">
            <DoodleIcon name={c.icon} size={16} /> {c.name}
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => onMove(c.id, -1)} className="w-6 h-6 border-2 border-ink bg-white text-xs press-down">
              ↑
            </button>
            <button onClick={() => onMove(c.id, 1)} className="w-6 h-6 border-2 border-ink bg-white text-xs press-down">
              ↓
            </button>
            <button onClick={() => deleteCategory(c.id)} className="font-mono text-[11px] underline ml-1">
              borrar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryFormSheet({ open, isIncome, onClose }: { open: boolean; isIncome: boolean; onClose: () => void }) {
  const categories = useCategories();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<Category["icon"]>("dots");
  const [color, setColor] = useState<PaletteColor>("cream");
  const [budget, setBudget] = useState("");

  async function save() {
    if (!name) return;
    const maxOrder = Math.max(0, ...categories.filter((c) => c.isIncome === isIncome).map((c) => c.order));
    await addCategory({
      name,
      icon,
      color,
      isIncome,
      order: maxOrder + 1,
      monthlyBudget: budget ? toMinor(parseFloat(budget)) : undefined,
    });
    setName("");
    setBudget("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva categoría">
      <CategoryFields name={name} setName={setName} icon={icon} setIcon={setIcon} color={color} setColor={setColor} budget={budget} setBudget={setBudget} showBudget={!isIncome} />
      <Button full size="lg" onClick={save} disabled={!name} className="mt-4">
        Crear
      </Button>
    </Sheet>
  );
}

function CategoryEditSheet({ category, onClose }: { category: Category; onClose: () => void }) {
  const [name, setName] = useState(category.name);
  const [icon, setIcon] = useState<Category["icon"]>(category.icon);
  const [color, setColor] = useState<PaletteColor>(category.color);
  const [budget, setBudget] = useState(category.monthlyBudget ? String(toMajor(category.monthlyBudget)) : "");

  async function save() {
    await updateCategory(category.id, {
      name,
      icon,
      color,
      monthlyBudget: budget ? toMinor(parseFloat(budget)) : undefined,
    });
    onClose();
  }

  return (
    <Sheet open onClose={onClose} title="Editar categoría">
      <CategoryFields name={name} setName={setName} icon={icon} setIcon={setIcon} color={color} setColor={setColor} budget={budget} setBudget={setBudget} showBudget={!category.isIncome} />
      <Button full size="lg" onClick={save} disabled={!name} className="mt-4">
        Guardar
      </Button>
    </Sheet>
  );
}

function CategoryFields({
  name,
  setName,
  icon,
  setIcon,
  color,
  setColor,
  budget,
  setBudget,
  showBudget,
}: {
  name: string;
  setName: (v: string) => void;
  icon: Category["icon"];
  setIcon: (v: Category["icon"]) => void;
  color: PaletteColor;
  setColor: (v: PaletteColor) => void;
  budget: string;
  setBudget: (v: string) => void;
  showBudget: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Nombre" required>
        <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Ícono">
        <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto border-2 border-ink p-2 bg-white">
          {DOODLE_ICON_NAMES.map((i) => (
            <button
              key={i}
              onClick={() => setIcon(i)}
              className={`w-8 h-8 flex items-center justify-center border-2 ${icon === i ? "border-ink bg-cream" : "border-transparent"}`}
            >
              <DoodleIcon name={i} size={16} />
            </button>
          ))}
        </div>
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
      {showBudget && (
        <Field label="Presupuesto mensual (opcional)">
          <MoneyInput value={budget} onChange={setBudget} />
        </Field>
      )}
    </div>
  );
}

function AccountFormSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [kind, setKind] = useState<AccountKind>("banco");
  const [color, setColor] = useState<PaletteColor>("mint");

  async function save() {
    if (!name) return;
    await addAccount({ name, kind, color, initialBalance: 0 });
    setName("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva cuenta">
      <div className="flex flex-col gap-4">
        <Field label="Nombre" required>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Cuenta sueldo" />
        </Field>
        <Field label="Tipo">
          <Select value={kind} onChange={(e) => setKind(e.target.value as AccountKind)}>
            <option value="banco">Banco</option>
            <option value="billetera">Billetera virtual</option>
            <option value="efectivo">Efectivo</option>
            <option value="ahorros">Ahorros</option>
            <option value="otra">Otra</option>
          </Select>
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
        <Button full size="lg" onClick={save} disabled={!name}>
          Crear cuenta
        </Button>
      </div>
    </Sheet>
  );
}
