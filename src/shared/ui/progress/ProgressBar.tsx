import { cn } from "../../utils/cn";

type Props = {
  value: number;
  max?: number;
  className?: string;
};

export function ProgressBar({ value, max = 100, className }: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("h-2 w-full rounded-full bg-[rgb(var(--surface-2))]", className)}>
      <div
        className="h-2 rounded-full bg-[rgb(var(--accent))]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
