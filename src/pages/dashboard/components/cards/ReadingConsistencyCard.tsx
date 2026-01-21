import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  data: { name: string; days: number }[];
};

export function ReadingConsistencyCard({ theme, variant, data }: Props) {
  const grid = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
  const axis = theme === "dark" ? "rgba(241,243,255,0.55)" : "rgba(100,116,139,0.85)";

  const tileClass =
    theme === "light"
      ? "bg-orange-500 text-white border-orange-500"
      : "bg-[rgb(var(--surface-2))] text-[rgb(var(--text))] border-[rgb(var(--border))]";

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
        <CardTitle>Reading Consistency Score</CardTitle>
        <CardDescription>Frequency and duration of reading sessions</CardDescription>
      </CardHeader>

      <div className="mt-4 h-[150px] sm:h-[160px] md:h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />
            <Line type="monotone" dataKey="days" stroke="rgb(var(--chart))" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className={cn("rounded-2xl border p-3", tileClass)}>
          <div className={cn("text-[11px] font-semibold", theme === "light" ? "text-white/90" : "text-[rgb(var(--muted))]")}>
            Most Consistent
          </div>
          <div className="mt-1 text-xs font-semibold">M. Johnson (7 days)</div>
        </div>
        <div className={cn("rounded-2xl border p-3", tileClass)}>
          <div className={cn("text-[11px] font-semibold", theme === "light" ? "text-white/90" : "text-[rgb(var(--muted))]")}>
            Needs Encouragement
          </div>
          <div className="mt-1 text-xs font-semibold">E. Brown (3 days)</div>
        </div>
      </div>
    </Card>
  );
}
