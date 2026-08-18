import type { ReactNode } from "react";

export default function Field({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-mono text-xs uppercase tracking-wider">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      {children}
      {hint && <p className="font-mono text-[11px] text-ink/60">{hint}</p>}
    </div>
  );
}
