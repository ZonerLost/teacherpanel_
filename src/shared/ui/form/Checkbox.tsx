import React from "react";
import { cn } from "../../utils/cn";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-[rgb(var(--text))]">
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-[rgb(var(--border))] accent-[rgb(var(--accent))]",
          className
        )}
        {...props}
      />
      {label ? <span className="text-xs">{label}</span> : null}
    </label>
  );
}
