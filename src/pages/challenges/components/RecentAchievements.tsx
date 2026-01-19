/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { Achievement } from "../challenges.types";

type Props = {
  variant: "surface" | "glass";
  achievements: Achievement[];
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
  return `https://i.pravatar.cc/120?img=${idx}`;
}

function Avatar({
  name,
  seed,
  url,
  sizeClass = "h-9 w-9",
}: {
  name: string;
  seed: string;
  url?: string | null;
  sizeClass?: string;
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

export function RecentAchievements({ variant, achievements }: Props) {
  return (
    <Card variant={variant} className="p-5">
      <div className="text-sm font-extrabold text-[rgb(var(--text))]">
        Recent Student Achievements
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {achievements.map((a) => {
          const name = a.studentName;
          const seed = `achievement-${a.id}-${name}`;

          // If you later add a.avatarUrl in your type/data, it will be used automatically
          const avatarUrl = (a as any)?.avatarUrl as string | undefined;

          return (
            <div
              key={a.id}
              className="flex items-start gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
            >
              <Avatar name={name} seed={seed} url={avatarUrl} />

              <div className="min-w-0">
                <div className="text-sm font-bold text-[rgb(var(--text))]">{name}</div>
                <div className="mt-0.5 text-xs text-[rgb(var(--muted))]">{a.text}</div>
                <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">{a.dateLabel}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
  