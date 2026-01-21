import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  valuePct: number;
  data: { week: string; score: number }[];
};

export function AverageComprehensionCard({ theme, variant, valuePct, data }: Props) {
  const grid = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
  const axis = theme === "dark" ? "rgba(241,243,255,0.55)" : "rgba(100,116,139,0.85)";

  return (
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
        <CardTitle>Average Comprehension Score</CardTitle>
        <CardDescription>Overall class understanding</CardDescription>
      </CardHeader>

      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="text-xs text-[rgb(var(--muted))]">Current Class Average</div>
        <div className="text-sm font-bold text-[rgb(var(--text))]">{valuePct}%</div>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-[rgb(var(--surface-2))]">
        <div className="h-2 rounded-full bg-[rgb(var(--chart))]" style={{ width: `${valuePct}%` }} />
      </div>

      <div className="mt-4 h-[160px] sm:h-[180px] md:h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="week" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />
            <Line type="monotone" dataKey="score" stroke="rgb(var(--chart))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-xs text-[rgb(var(--muted))]">Trend over last 6 weeks</div>
    </Card>
  );
}
