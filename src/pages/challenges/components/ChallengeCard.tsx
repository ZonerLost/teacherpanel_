import { Users, CalendarDays } from "lucide-react";
import { Button } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { Challenge } from "../challenges.types";
import { formatDueDate, statusLabel } from "../utils/format";

type Props = {
  challenge: Challenge;
  theme: "light" | "dark";
  onViewDetails: (c: Challenge) => void;
};

function StatusPill({ status }: { status: Challenge["status"] }) {
  const cls =
    status === "active"
      ? "bg-lime-500/20 text-lime-400 border-lime-400/20"
      : status === "upcoming"
        ? "bg-amber-500/20 text-amber-400 border-amber-400/20"
        : "bg-slate-500/20 text-slate-300 border-slate-300/20";

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold", cls)}>
      {statusLabel(status)}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-black/10">
      <div
        className="h-2 rounded-full bg-violet-500"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

export function ChallengeCard({ challenge, theme, onViewDetails }: Props) {
  const btn =
    theme === "dark"
      ? "bg-transparent border border-white/15 text-white/90 hover:bg-white/10"
      : "bg-lime-400 text-black hover:bg-lime-300";

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-[rgb(var(--text))]">{challenge.title}</div>
          <div className="mt-2 flex items-center gap-3 text-xs text-[rgb(var(--muted))]">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {challenge.participantsCount} Students Participating
            </span>
          </div>
        </div>
        <StatusPill status={challenge.status} />
      </div>

      <div className="mt-3">
        <ProgressBar value={challenge.progressPct} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDueDate(challenge.dueDate)}
        </span>
        <span>{challenge.progressPct}%</span>
      </div>

      <div className="mt-3">
        <Button
          variant="ghost"
          className={cn("w-full rounded-xl", btn)}
          onClick={() => onViewDetails(challenge)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
