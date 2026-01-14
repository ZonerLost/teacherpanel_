import React from "react";
import { Search } from "lucide-react";
import { cn } from "../../utils/cn";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapClassName?: string;
};

export function SearchInput({ className, wrapClassName, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative h-11 w-full max-w-md rounded-2xl border", "border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]", wrapClassName)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
      <input
        className={cn(
          "h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none",
          "text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]",
          "focus:ring-2 focus:ring-[rgb(var(--accent))]/25",
          className
        )}
        {...props}
      />
    </div>
  );
}
