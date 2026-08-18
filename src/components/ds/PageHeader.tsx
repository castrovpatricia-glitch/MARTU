export default function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="border-b-2 border-ink px-4 sm:px-6 py-5">
      {eyebrow && <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-1">{eyebrow}</p>}
      <h1 className="font-display text-3xl sm:text-4xl leading-none">{title}</h1>
      {subtitle && <p className="font-hand text-2xl mt-1">{subtitle}</p>}
    </div>
  );
}
