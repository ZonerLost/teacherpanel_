import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../shared/ui";
import type { ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  data: { genre: string; value: number }[];
};

const COLORS = ["#FB7185", "#60A5FA", "#F59E0B", "#A78BFA", "#34D399"];

export function ReadingDistributionCard({ variant, data }: Props) {
  return (
    <Card variant={variant} className="p-4 sm:p-5">
      <CardHeader>
        <CardTitle>Reading Distribution by Genre</CardTitle>
        <CardDescription>Class reading preferences by genre</CardDescription>
      </CardHeader>

      <div className="mt-4 h-[170px] sm:h-[190px] md:h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="genre"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[rgb(var(--muted))]">
        {data.map((d, i) => (
          <div key={d.genre} className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="whitespace-nowrap">{d.genre}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-[rgb(var(--muted))]">Top genres read by the class</div>
    </Card>
  );
}
