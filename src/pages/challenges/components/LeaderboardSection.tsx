/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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

function hashToUint32(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function avatarFromSeed(seed: string) {
  const idx = (hashToUint32(seed) % 70) + 1;
  return `https://i.pravatar.cc/150?img=${idx}`;
}

function Avatar({
  name,
  seed,
  sizeClass,
  url,
}: {
  name: string;
  seed: string;
  sizeClass: string;
  url?: string | null;
}) {
  const [ok, setOk] = React.useState(true);
  const fallbackUrl = React.useMemo(() => avatarFromSeed(seed), [seed]);
  const finalUrl = url || fallbackUrl;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-[rgb(var(--surface-2))] ring-1 ring-[rgb(var(--border))]",
        sizeClass
      )}
    >
      {ok ? (
        <img
          src={finalUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-xs font-semibold text-[rgb(var(--muted))]">
          {name?.slice(0, 1)?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}

function TopCard({
  name,
  rankLabel,
  booksReadLabel,
  winner,
  theme,
  avatarUrl,
  seed,
}: {
  name: string;
  rankLabel: string;
  booksReadLabel: string;
  winner?: boolean;
  theme: "light" | "dark";
  avatarUrl?: string | null;
  seed: string;
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

      <div className="mx-auto">
        <Avatar name={name} seed={seed} url={avatarUrl} sizeClass="h-10 w-10" />
      </div>

      <div className="mt-2 text-sm font-bold text-[rgb(var(--text))]">{name}</div>
      <div className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">{rankLabel}</div>
      <div className="mt-1 text-xs text-[rgb(var(--muted))]">{booksReadLabel}</div>
    </div>
  );
}

function Table({
  rows,
  
  seedPrefix,
}: {
  rows: LeaderboardDataset["rows"];
  theme: "light" | "dark";
  seedPrefix: string;
}) {
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
          {rows.map((r) => {
            const name = r.studentName;
            const seed = `${seedPrefix}-row-${name}`;

            // If later you have r.avatarUrl, it will automatically be used
            const avatarUrl = (r as any)?.avatarUrl as string | undefined;

            return (
              <tr key={r.rank} className="border-t border-[rgb(var(--border))]">
                <td className="px-3 py-2 text-[rgb(var(--text))]/80">{r.rank}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={name} seed={seed} url={avatarUrl} sizeClass="h-6 w-6" />
                    <span className="text-[rgb(var(--text))]">{name}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-[rgb(var(--text))]/80">{r.booksRead}</td>
                <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 md:table-cell">{r.pagesRead}</td>
                <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 lg:table-cell">{r.wordsRead}</td>
                <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 lg:table-cell">{r.timeSpentHrs}</td>
                <td className="hidden px-3 py-2 text-[rgb(var(--text))]/80 xl:table-cell">{r.newWordsLearned}</td>
                <td className="px-3 py-2 text-right font-semibold text-violet-500">
                  {r.avgScorePoints} points
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function LeaderboardSection({ variant, dataset, options, onChangeKey, theme }: Props) {
  const seedPrefix = `leaderboard-${dataset.key}`;

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
        {dataset.top3.map((t) => {
          const name = t.studentName;
          const seed = `${seedPrefix}-top-${name}`;

          // If later you add t.avatarUrl, it will be used automatically
          const avatarUrl = (t as any)?.avatarUrl as string | undefined;

          return (
            <TopCard
              key={name}
              name={name}
              rankLabel={t.rankLabel}
              booksReadLabel={t.booksReadLabel}
              winner={t.isWinner}
              theme={theme}
              seed={seed}
              avatarUrl={avatarUrl}
            />
          );
        })}
      </div>

      <Table rows={dataset.rows} theme={theme} seedPrefix={seedPrefix} />
    </Card>
  );
}
