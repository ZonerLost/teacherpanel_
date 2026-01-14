import React from "react";
import { Card, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { LeaderboardRow, ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  rows: LeaderboardRow[];
};

export function StudentLeaderboardCard({ theme, variant, rows }: Props) {
  const [mode, setMode] = React.useState<"rank" | "books">("rank");

  const activeBtn =
    theme === "dark"
      ? "bg-[rgb(var(--primary))] text-white"
      : "bg-[rgb(var(--primary))] text-slate-900";

  const idleBtn =
    theme === "dark"
      ? "bg-[rgb(var(--surface-2))] text-[rgb(var(--muted))]"
      : "bg-[rgb(var(--surface-2))] text-[rgb(var(--muted))]";

  return (
    <Card
      variant={variant}
      className={cn(
        "p-5",
        "border-[rgb(var(--border))]",
        theme === "dark"
          ? "bg-[rgb(var(--surface)_/_0.55)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          : "bg-[rgb(var(--surface))] shadow-[0_12px_40px_rgba(2,12,27,0.08)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle>Student Reading Leaderboard</CardTitle>
          <CardDescription>Track total books, words, time and vocabulary growth</CardDescription>
        </div>

        <div className="inline-flex rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-1">
          <button
            type="button"
            onClick={() => setMode("rank")}
            className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", mode === "rank" ? activeBtn : idleBtn)}
          >
            Rank
          </button>
          <button
            type="button"
            onClick={() => setMode("books")}
            className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", mode === "books" ? activeBtn : idleBtn)}
          >
            Book Read
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-[rgb(var(--border))]">
        <table className="min-w-[420px] w-full text-left text-xs">
          <thead className="bg-[rgb(var(--surface-2))]">
            <tr>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Rank</th>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Student</th>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">
                {mode === "books" ? "Books" : "Score"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.rank}-${r.student}`}
                className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60"
              >
                <td className="px-3 py-2 text-[rgb(var(--text))]">{r.rank}</td>
                <td className="px-3 py-2 text-[rgb(var(--text))]/85">{r.student}</td>
                <td className="px-3 py-2 text-[rgb(var(--text))]">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
