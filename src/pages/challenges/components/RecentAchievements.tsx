import { Card } from "../../../shared/ui";
import type { Achievement } from "../challenges.types";

type Props = {
  variant: "surface" | "glass";
  achievements: Achievement[];
};

export function RecentAchievements({ variant, achievements }: Props) {
  return (
    <Card variant={variant} className="p-5">
      <div className="text-sm font-extrabold text-[rgb(var(--text))]">Recent Student Achievements</div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
          >
            <div className="h-9 w-9 rounded-full bg-[rgb(var(--surface-2))]" />
            <div className="min-w-0">
              <div className="text-sm font-bold text-[rgb(var(--text))]">{a.studentName}</div>
              <div className="mt-0.5 text-xs text-[rgb(var(--muted))]">{a.text}</div>
              <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">{a.dateLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
