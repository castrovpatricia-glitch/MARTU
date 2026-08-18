import { cn } from "@/lib/cn";

export default function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2"
    >
      {label && <span className="font-mono text-xs uppercase tracking-wide">{label}</span>}
      <span
        className={cn(
          "w-12 h-7 border-2 border-ink relative transition-colors shrink-0",
          checked ? "bg-lime" : "bg-white"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 bottom-0.5 w-5 border-2 border-ink bg-ink transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}
