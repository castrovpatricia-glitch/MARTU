import { cn } from "@/lib/cn";

export default function ProgressBar({
  pct,
  color = "bg-lime",
  overColor = "bg-orange",
  height = "h-5",
}: {
  pct: number;
  color?: string;
  overColor?: string;
  height?: string;
}) {
  const clamped = Math.min(Math.max(pct, 0), 100);
  const over = pct > 100;
  return (
    <div className={cn("w-full border-2 border-ink bg-white relative overflow-hidden", height)}>
      <div
        className={cn("h-full transition-all", over ? overColor : color)}
        style={{ width: `${over ? 100 : clamped}%` }}
      />
      {over && (
        <div className="absolute inset-y-0 right-0 w-1.5 bg-ink" title="Presupuesto superado" />
      )}
    </div>
  );
}
