import React from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const sizeCls: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  pill = true,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]/40 disabled:opacity-60 disabled:cursor-not-allowed";

  const variantCls =
    variant === "primary"
      ? "bg-[rgb(var(--accent))] text-black hover:brightness-95"
      : variant === "secondary"
        ? "bg-[rgb(var(--surface-2))] text-[rgb(var(--text))] hover:brightness-98"
        : variant === "outline"
          ? "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--surface-2))]"
          : variant === "ghost"
            ? "bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--surface-2))]"
            : "bg-[rgb(var(--danger))] text-white hover:brightness-95";

  return (
    <button
      className={cn(base, sizeCls[size], pill ? "rounded-2xl" : "rounded-xl", variantCls, className)}
      {...props}
    >
      {leftIcon}
      {props.children}
      {rightIcon}
    </button>
  );
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
};

export function IconButton({ className, size = "md", ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition hover:bg-[rgb(var(--surface-2))] focus:outline-none",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}
