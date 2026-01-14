import React from "react";
import { cn } from "../../utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[110px] w-full rounded-2xl border p-3 text-sm outline-none transition",
        "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]",
        "focus:border-[rgb(var(--accent))]/60 focus:bg-[rgb(var(--surface))]",
        className
      )}
      {...props}
    />
  );
}
