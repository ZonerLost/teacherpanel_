export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <div className="text-sm font-extrabold text-[rgb(var(--text))]">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-[rgb(var(--muted))]">{subtitle}</div> : null}
    </div>
  );
}
