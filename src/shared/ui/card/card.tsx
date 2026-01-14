import React from "react";
import { cn } from "../../utils/cn";

type CardVariant = "surface" | "glass";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export function Card({ className, variant = "surface", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-2xl)] border p-5",
        variant === "surface" &&
          "bg-[rgb(var(--surface))] border-[rgb(var(--border))] shadow-[var(--shadow-soft)]",
        variant === "glass" &&
          "bg-[rgb(var(--surface))] border-[color:rgb(var(--border))] shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-semibold text-[rgb(var(--text))]", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-xs text-[rgb(var(--muted))]", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-5 flex items-center justify-end gap-2", className)} {...props} />;
}
