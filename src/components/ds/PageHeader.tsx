export default function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="relative px-5 sm:px-6 pt-7 pb-5 overflow-hidden">
      <div className="absolute -top-6 -right-8 w-28 h-28 bg-yellow/40 blob-badge pointer-events-none" aria-hidden />
      {eyebrow && <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 mb-1 relative">{eyebrow}</p>}
      <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight relative">{title}</h1>
      {subtitle && <p className="font-hand text-2xl mt-0.5 relative">{subtitle}</p>}
    </div>
  );
}
