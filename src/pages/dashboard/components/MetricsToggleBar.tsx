import { ChevronDown } from "lucide-react";
import { ToggleSwitch } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { MetricToggle, MetricKey } from "../dashboard.types";
import type { ClassName } from "../dashboard.data";

type Props = {
  title: string;
  toggles: MetricToggle[];
  enabled: Record<MetricKey, boolean>;
  onToggle: (key: MetricKey, checked: boolean) => void;

  classValue: ClassName;
  onClassChange: (value: ClassName) => void;
  classOptions: readonly ClassName[];
};

export function MetricsToggleBar({
  title,
  toggles,
  enabled,
  onToggle,
  classValue,
  onClassChange,
  classOptions,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] p-4 sm:p-5 lg:p-6",
        "bg-[rgb(var(--surface))] shadow-[0_12px_40px_rgba(2,12,27,0.06)]",
        "dark:bg-[rgb(var(--surface)_/_0.55)] dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
      )}
    >
      {/* gradient wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* light */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0">
          <div className="absolute -left-24 -top-24 h-[280px] w-[280px] rounded-full bg-rose-400/15 blur-3xl" />
          <div className="absolute right-10 -top-20 h-[280px] w-[280px] rounded-full bg-lime-300/15 blur-3xl" />
        </div>
        {/* dark */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100">
          <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute right-10 -top-20 h-[320px] w-[320px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>
      </div>

      <div className="relative z-10">
        {/* header row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-xl lg:text-2xl">
              {title}
            </h2>
          </div>

          {/* Class dropdown */}
          <div className="w-full sm:w-[220px] md:w-[240px]">
            <div
              className={cn(
                "relative h-11 w-full rounded-2xl border border-[rgb(var(--border))] shadow-sm",
                "bg-[#a4de02] dark:bg-[rgb(var(--surface))]/60"
              )}
            >
              <select
                value={classValue}
                onChange={(e) => onClassChange(e.target.value as ClassName)}
                className={cn(
                  "h-full w-full appearance-none rounded-2xl bg-transparent pl-4 pr-10 text-sm font-semibold outline-none",
                  "text-slate-900 dark:text-[rgb(var(--text))]",
                  "focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-0"
                )}
                aria-label="Filter by class"
              >
                {classOptions.map((c) => (
                  <option key={c} value={c} className="text-slate-900">
                    {c}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-700 dark:text-[rgb(var(--muted))]" />
            </div>
          </div>
        </div>

        {/* ✅ responsive toggle chips: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {toggles.map((t) => {
            const isOn = !!enabled[t.key];

            return (
              <div
                key={t.key}
                className={cn(
                  "min-w-0 inline-flex items-center justify-between gap-3 rounded-2xl border px-3 py-2",
                  "bg-white/65 dark:bg-[rgb(var(--surface))]/55 backdrop-blur",
                  isOn
                    ? "border-[rgb(var(--primary))] shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
                    : "border-[rgb(var(--border))]"
                )}
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="truncate text-xs font-semibold text-[rgb(var(--text))]">
                    {t.label}
                  </span>
                  {t.valueText ? (
                    <span className="shrink-0 rounded-full bg-[rgb(var(--surface-2))] px-2 py-0.5 text-[11px] font-bold text-[rgb(var(--text))]">
                      {t.valueText}
                    </span>
                  ) : null}
                </div>

                <ToggleSwitch checked={isOn} onChange={(v) => onToggle(t.key, v)} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
