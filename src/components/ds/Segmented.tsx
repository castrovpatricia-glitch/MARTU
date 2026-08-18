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
    <div className={cn("inline-flex border-2 border-ink overflow-hidden flex-wrap", className)}>
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
            i > 0 && "border-l-2 border-ink",
            value === opt.value ? "bg-ink text-paper" : "bg-white text-ink hover:bg-cream"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
