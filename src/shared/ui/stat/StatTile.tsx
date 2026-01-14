import React from "react";
import { cn } from "../../utils/cn";
import { Card } from "../card/card";

type StatTileProps = {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "surface" | "glass";
  className?: string;
};

export function StatTile({ label, value, subValue, icon, variant = "glass", className }: StatTileProps) {
  return (
    <Card variant={variant} className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[rgb(var(--muted))]">{label}</p>
          <div className="mt-1 text-2xl font-bold text-[rgb(var(--text))]">{value}</div>
          {subValue ? <div className="mt-1 text-xs text-[rgb(var(--muted))]">{subValue}</div> : null}
        </div>
        {icon ? (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgb(var(--surface-2))]">
            {icon}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
