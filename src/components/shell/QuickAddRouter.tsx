"use client";

import Sheet from "@/components/ds/Sheet";
import TransactionForm from "@/components/forms/TransactionForm";
import { useUiStore } from "@/store/uiStore";

const TITLES: Record<string, string> = {
  expense: "Agregar gasto",
  income: "Agregar ingreso",
  transfer: "Transferencia",
  saving: "Movimiento de ahorro",
};

const COLORS: Record<string, string> = {
  expense: "bg-orange text-white",
  income: "bg-lime",
  transfer: "bg-blue",
  saving: "bg-mint",
};

export default function QuickAddRouter() {
  const kind = useUiStore((s) => s.quickAddKind);
  const editId = useUiStore((s) => s.quickAddEditId);
  const closeQuickAdd = useUiStore((s) => s.closeQuickAdd);

  return (
    <Sheet
      open={Boolean(kind)}
      onClose={closeQuickAdd}
      title={kind ? (editId ? "Editar movimiento" : TITLES[kind]) : ""}
      color={kind ? COLORS[kind] : "bg-white"}
    >
      {kind && <TransactionForm type={kind} editId={editId} onDone={closeQuickAdd} />}
    </Sheet>
  );
}
