"use client";

import { useId } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  currencySymbol?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function MoneyInput({ value, onChange, currencySymbol = "$", autoFocus, placeholder = "0" }: Props) {
  const id = useId();
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white text-ink px-4 py-3.5 shadow-hard-sm focus-within:shadow-hard transition-shadow">
      <span className="font-display text-2xl sm:text-3xl">{currencySymbol}</span>
      <input
        id={id}
        autoFocus={autoFocus}
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const v = e.target.value.replace(",", ".");
          if (/^\d*\.?\d{0,2}$/.test(v)) onChange(v);
        }}
        className="font-display text-3xl sm:text-4xl w-full outline-none bg-transparent"
      />
    </div>
  );
}
