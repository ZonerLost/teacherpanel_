import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { AtRiskRow, ThemeVariant } from "../../dashboard.types";
import { StudentProfileModal } from "../modals/StudentProfileModal";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  rows: AtRiskRow[];
};

function FlagPill({ flag }: { flag: AtRiskRow["flag"] }) {
  const cls =
    flag === "High"
      ? "bg-red-500/20 text-red-500"
      : flag === "Medium"
      ? "bg-amber-500/20 text-amber-500"
      : "bg-emerald-500/20 text-emerald-500";

  return <span className={cn("rounded-full px-2 py-1 text-[11px] font-semibold", cls)}>{flag}</span>;
}

export function AtRiskFlagsCard({ theme, variant, rows }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<AtRiskRow | null>(null);
  const clearRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (clearRef.current) window.clearTimeout(clearRef.current);
    };
  }, []);

  const onViewProfile = (row: AtRiskRow) => {
    setSelected(row);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    if (clearRef.current) window.clearTimeout(clearRef.current);
    clearRef.current = window.setTimeout(() => setSelected(null), 150);
  };

  return (
    <>
      <Card
        variant={variant}
        className={cn(
          "p-4 sm:p-5",
          "border-[rgb(var(--border))]",
          theme === "dark"
            ? "bg-[rgb(var(--surface)_/_0.55)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
            : "bg-[rgb(var(--surface))] shadow-[0_12px_40px_rgba(2,12,27,0.08)]"
        )}
      >
        <CardHeader>
          <CardTitle>At-Risk Flags</CardTitle>
          <CardDescription>Students needing immediate attention</CardDescription>
        </CardHeader>

        <div className="mt-3 overflow-x-auto rounded-2xl border border-[rgb(var(--border))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[420px] sm:min-w-[520px] text-left text-xs">
            <thead className="bg-[rgb(var(--surface-2))]">
              <tr>
                <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] whitespace-nowrap">
                  Student
                </th>
                <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] whitespace-nowrap">
                  Risk Factor
                </th>
                <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] whitespace-nowrap">
                  Flag
                </th>
                <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))] whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60"
                >
                  <td className="px-3 py-2 text-[rgb(var(--text))] whitespace-nowrap">
                    {r.student}
                  </td>
                  <td className="px-3 py-2 text-[rgb(var(--text))]/80">
                    <span className="line-clamp-1">{r.riskFactor}</span>
                  </td>
                  <td className="px-3 py-2">
                    <FlagPill flag={r.flag} />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => onViewProfile(r)}
                      className="text-xs font-semibold text-[rgb(var(--primary))] hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <StudentProfileModal open={open} onClose={close} theme={theme} variant={variant} row={selected} />
    </>
  );
}
