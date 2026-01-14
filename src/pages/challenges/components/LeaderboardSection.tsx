import { Crown } from "lucide-react";
import { Card, Select } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { LeaderboardDataset } from "../challenges.types";

type Props = {
  variant: "surface" | "glass";
  dataset: LeaderboardDataset;
  options: LeaderboardDataset[];
  onChangeKey: (key: string) => void;
  theme: "light" | "dark";
};

function TopCard({
  name,
  rankLabel,
  booksReadLabel,
  winner,
  theme,
}: {
  name: string;
  rankLabel: string;
  booksReadLabel: string;
  winner?: boolean;
  theme: "light" | "dark";
}) {
  const base =
    theme === "dark"
      ? "bg-white/10 border-white/10"
      : "bg-[rgb(var(--surface))] border-[rgb(var(--border))]";

  return (
    <div className={cn("relative rounded-2xl border p-4 text-center", base)}>
      {winner ? (
        <div className="absolute right-3 top-3">
          <Crown className="h-4 w-4 text-amber-400" />
        </div>
      ) : null}

      <div className="mx-auto h-10 w-10 rounded-full bg-[rgb(var(--surface-2))]" />
      <div className="mt-2 text-sm font-bold text-[rgb(var(--text))]">{name}</div>
      <div className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">{rankLabel}</div>
      <div className="mt-1 text-xs text-[rgb(var(--muted))]">{booksReadLabel}</div>
    </div>
  );
}

function Table({ rows }: { rows: LeaderboardDataset["rows"]; theme: "light" | "dark" }) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-[rgb(var(--border))]">
      <table className="w-full text-left text-xs">
        <thead className={cn("bg-[rgb(var(--surface-2))]")}>
          <tr>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Rank</th>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Student</th>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Books Read</th>
            <th className="hidden px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] md:table-cell">
              Pages Read
            </th>
            <th className="hidden px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] lg:table-cell">
              Words Read
            </th>
            <th className="hidden px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] lg:table-cell">
              Time Spent (hrs)
            </th>
            <th className="hidden px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] xl:table-cell">
              New Words Learned
            </th>
            <th className="px-3 py-2 text-right text-[11px] font-semibold text-[rgb(var(--muted))]">Avg Score</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.rank} className="border-t border-[rgb(var(--border))]">
              <td className="px-3 py-2 text-[rgb(var(--text))]/80">{r.rank}</td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[rgb(var(--surface-2))]" />
                  <span className="text-[rgb(var(--text))]">{r.studentName}</span>
                </div>
              </td>
              <td className="px-3 py-2 text-[rgb(var(--text))]/80">{r.booksRead}</td>
              <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 md:table-cell">{r.pagesRead}</td>
              <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 lg:table-cell">{r.wordsRead}</td>
              <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 lg:table-cell">{r.timeSpentHrs}</td>
              <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 xl:table-cell">{r.newWordsLearned}</td>
              <td className="px-3 py-2 text-right font-semibold text-violet-500">{r.avgScorePoints} points</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LeaderboardSection({ variant, dataset, options, onChangeKey, theme }: Props) {
  return (
    <Card variant={variant} className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-extrabold text-[rgb(var(--text))]">Top Readers Leaderboard</div>

        <div className="w-full sm:w-[240px]">
          <Select value={dataset.key} onChange={(e) => onChangeKey(e.target.value)}>
            {options.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {dataset.top3.map((t) => (
          <TopCard
            key={t.studentName}
            name={t.studentName}
            rankLabel={t.rankLabel}
            booksReadLabel={t.booksReadLabel}
            winner={t.isWinner}
            theme={theme}
          />
        ))}
      </div>

      <Table rows={dataset.rows} theme={theme} />
    </Card>
  );
}
