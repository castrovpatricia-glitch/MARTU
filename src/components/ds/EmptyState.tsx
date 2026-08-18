import DoodleIcon from "@/components/doodles/DoodleIcon";
import type { DoodleIconName } from "@/lib/types";

export default function EmptyState({
  icon = "scribble",
  title,
  subtitle,
}: {
  icon?: DoodleIconName;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-10 px-4 opacity-80">
      <DoodleIcon name={icon} size={40} />
      <p className="font-hand text-2xl sm:text-3xl leading-tight max-w-xs">{title}</p>
      {subtitle && <p className="font-mono text-xs max-w-xs">{subtitle}</p>}
    </div>
  );
}
