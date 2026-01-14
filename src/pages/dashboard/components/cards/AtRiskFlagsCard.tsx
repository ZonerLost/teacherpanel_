import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { AtRiskRow, ThemeVariant } from "../../dashboard.types";

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
      <CardHeader>
        <CardTitle>At-Risk Flags</CardTitle>
        <CardDescription>Students needing immediate attention</CardDescription>
      </CardHeader>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-[rgb(var(--border))]">
        <table className="min-w-[520px] w-full text-left text-xs">
          <thead className="bg-[rgb(var(--surface-2))]">
            <tr>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Student</th>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Risk Factor</th>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Flag</th>
              <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60"
              >
                <td className="px-3 py-2 text-[rgb(var(--text))]">{r.student}</td>
                <td className="px-3 py-2 text-[rgb(var(--text))]/80">{r.riskFactor}</td>
                <td className="px-3 py-2">
                  <FlagPill flag={r.flag} />
                </td>
                <td className="px-3 py-2">
                  <button className="text-xs font-semibold text-[rgb(var(--primary))] hover:underline">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
