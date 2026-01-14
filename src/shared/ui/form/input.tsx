import React from "react";
import { cn } from "../../utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border px-3 text-sm outline-none transition",
        "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]",
        "focus:border-[rgb(var(--accent))]/60 focus:bg-[rgb(var(--surface))]",
        className
      )}
      {...props}
    />
  );
}
