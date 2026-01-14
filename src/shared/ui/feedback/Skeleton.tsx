import { cn } from "../../utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-[rgb(var(--surface-2))]",
        className
      )}
    />
  );
}
