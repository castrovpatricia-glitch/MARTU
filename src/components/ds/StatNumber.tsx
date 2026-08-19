import { cn } from "@/lib/cn";

export default function StatNumber({
  label,
  value,
  size = "lg",
  className,
  align = "left",
}: {
  label: string;
  value: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const sizeClass = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-7xl",
  }[size];
  return (
    <div className={cn("flex flex-col gap-1", align === "right" && "items-end", align === "center" && "items-center", className)}>
      <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span className={cn("font-display font-bold leading-none tabular-nums", sizeClass)}>{value}</span>
    </div>
  );
}
