import { cn } from "../../utils/cn";

type Status = "generated" | "pending" | "active" | "completed" | "upcoming";

const map: Record<Status, string> = {
  generated: "bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))]",
  pending: "bg-[rgb(var(--warning))]/20 text-[rgb(var(--warning))]",
  active: "bg-[rgb(var(--success))]/20 text-[rgb(var(--success))]",
  completed: "bg-[rgb(var(--muted))]/20 text-[rgb(var(--text))]/80",
  upcoming: "bg-[rgb(var(--warning))]/15 text-[rgb(var(--warning))]",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold", map[status], className)}>
      {status}
    </span>
  );
}
