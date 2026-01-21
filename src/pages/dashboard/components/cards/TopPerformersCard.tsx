import { Card, CardHeader, CardTitle, CardDescription, Button } from "../../../../shared/ui";
import { cn } from "../../../../shared/utils/cn";
import type { Performer, ThemeVariant } from "../../dashboard.types";

type Props = {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  performers: Performer[];
};

export function TopPerformersCard({ theme, variant, performers }: Props) {
  const performerBox =
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
        <CardTitle>Top Performers & Encouragement</CardTitle>
        <CardDescription>Recognize and motivate high-achievers</CardDescription>
      </CardHeader>

      <div className="mt-4 grid gap-2">
        {performers.map((p) => (
          <div
            key={p.name}
            className={cn(
              "min-w-0 flex items-center justify-between gap-3 rounded-2xl border px-3 py-3",
              performerBox
            )}
          >
            <div className="min-w-0 flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                  theme === "light" ? "bg-white/15" : "bg-[rgb(var(--surface))]"
                )}
              >
                <span className="text-sm">{p.badge}</span>
              </div>

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold">{p.name}</div>
                <div className={cn("truncate text-[11px]", theme === "light" ? "text-white/85" : "text-[rgb(var(--muted))]")}>
                  {p.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          className={cn(
            "w-full",
            theme === "light"
              ? "!bg-[rgb(var(--primary))] !text-slate-900 hover:!opacity-90"
              : "!bg-[rgb(var(--primary))] !text-white hover:!opacity-90"
          )}
          variant="primary"
        >
          Send Encouragement
        </Button>
      </div>
    </Card>
  );
}
