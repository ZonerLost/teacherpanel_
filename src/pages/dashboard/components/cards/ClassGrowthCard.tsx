import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  data: { month: string; avg: number }[];
};

export function ClassGrowthCard({ theme, variant, data }: Props) {
  const grid = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
  const axis = theme === "dark" ? "rgba(241,243,255,0.55)" : "rgba(100,116,139,0.85)";

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
        <CardTitle>Class Growth Over Time</CardTitle>
        <CardDescription>Overall progress of the class’s learning journey</CardDescription>
      </CardHeader>

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />
            <Area
              type="monotone"
              dataKey="avg"
              stroke="rgb(var(--chart))"
              fill="rgb(var(--chart))"
              fillOpacity={0.18}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-xs text-[rgb(var(--muted))]">
        Class average score increased by{" "}
        <span className="font-semibold text-[rgb(var(--text))]">+15%</span> this semester.
      </div>
    </Card>
  );
}
