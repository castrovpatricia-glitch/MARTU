import { cn } from "@/lib/cn";

interface Option<T extends string> {
  value: T;
  label: string;
}

export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-full bg-white p-1 flex-wrap gap-1", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-4 py-2 rounded-full font-mono text-xs font-semibold transition-colors",
            value === opt.value ? "bg-ink text-paper" : "bg-transparent text-ink/60 hover:text-ink"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
