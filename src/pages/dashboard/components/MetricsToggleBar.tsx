import { ToggleSwitch, Select } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { MetricToggle, MetricKey } from "../dashboard.types";

type Props = {
  title: string;
  toggles: MetricToggle[];
  enabled: Record<MetricKey, boolean>;
  onToggle: (key: MetricKey, checked: boolean) => void;

  classValue: string;
  onClassChange: (value: string) => void;
  classOptions: readonly string[];
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
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[rgb(var(--text))]">{title}</h2>
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={classValue} onChange={(e) => onClassChange(e.target.value)} />
          {/* If your Select is not auto-rendering options, keep your old version.
              Otherwise, you likely already have it mapped internally. */}
          <select className="hidden" />
          <div className="hidden">
            {classOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {toggles.map((t) => {
          const isOn = !!enabled[t.key];

          return (
            <div
              key={t.key}
              className={cn(
                "inline-flex items-center gap-3 rounded-2xl border px-3 py-2",
                "bg-[rgb(var(--surface))] text-[rgb(var(--text))]",
                isOn
                  ? "border-[rgb(var(--primary)_/_0.55)]  shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
                  : "border-[rgb(var(--border))]"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[rgb(var(--text))]/85">{t.label}</span>
                {t.valueText ? (
                  <span className="text-xs font-semibold text-[rgb(var(--text))]">
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
  );
}
