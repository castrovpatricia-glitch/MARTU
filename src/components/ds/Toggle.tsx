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
      {label && <span className="font-mono text-xs font-semibold">{label}</span>}
      <span
        className={cn(
          "w-12 h-7 rounded-full relative transition-colors shrink-0 shadow-hard-sm",
          checked ? "bg-lime" : "bg-white"
        )}
      >
        <span
          className={cn(
            "absolute top-1 bottom-1 w-5 rounded-full bg-ink transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-1"
          )}
        />
      </span>
    </button>
  );
}
