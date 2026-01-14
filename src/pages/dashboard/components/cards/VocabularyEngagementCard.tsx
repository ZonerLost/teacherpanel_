import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  data: { name: string; words: number }[];
};

export function VocabularyEngagementCard({ theme, variant, data }: Props) {
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
        "p-5",
        "border-[rgb(var(--border))]",
        theme === "dark"
          ? "bg-[rgb(var(--surface)_/_0.55)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          : "bg-[rgb(var(--surface))] shadow-[0_12px_40px_rgba(2,12,27,0.08)]"
      )}
    >
      <CardHeader>
        <CardTitle>Vocabulary Engagement</CardTitle>
        <CardDescription>Unique words learned and applied</CardDescription>
      </CardHeader>

      <div className="mt-4 h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />
            <Bar dataKey="words" radius={[10, 10, 0, 0]} fill="rgb(var(--chart))" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className={cn("rounded-2xl border p-3", tileClass)}>
          <div className={cn("text-[11px] font-semibold", theme === "light" ? "text-white/90" : "text-[rgb(var(--muted))]")}>
            Top Vocab Builder
          </div>
          <div className="mt-1 text-xs font-semibold">L. Davis (+150 words)</div>
        </div>

        <div className={cn("rounded-2xl border p-3", tileClass)}>
          <div className={cn("text-[11px] font-semibold", theme === "light" ? "text-white/90" : "text-[rgb(var(--muted))]")}>
            Needs Boost
          </div>
          <div className="mt-1 text-xs font-semibold">K. Brown (+60 words)</div>
        </div>
      </div>
    </Card>
  );
}
