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
    <div className={cn("w-full rounded-full bg-white/70 relative overflow-hidden", height)}>
      <div
        className={cn("h-full rounded-full transition-all", over ? overColor : color)}
        style={{ width: `${over ? 100 : clamped}%` }}
      />
    </div>
  );
}
