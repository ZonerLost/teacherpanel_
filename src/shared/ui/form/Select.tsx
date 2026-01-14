import React from "react";
import { cn } from "../../utils/cn";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border px-3 text-sm outline-none transition",
        "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))] text-[rgb(var(--text))]",
        "focus:border-[rgb(var(--accent))]/60 focus:bg-[rgb(var(--surface))]",
        className
      )}
      {...props}
    />
  );
}
