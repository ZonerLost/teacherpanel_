import React from "react";
import { cn } from "../../utils/cn";

type FormFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FormField({ label, hint, error, required, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-[rgb(var(--text))]">
          {label} {required ? <span className="text-[rgb(var(--danger))]">*</span> : null}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-[rgb(var(--danger))]">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[rgb(var(--muted))]">{hint}</p>
      ) : null}
    </div>
  );
}
