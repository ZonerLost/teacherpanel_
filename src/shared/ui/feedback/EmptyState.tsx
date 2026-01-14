import React from "react";
import { cn } from "../../utils/cn";
import { Card } from "../card/card";
import { Button } from "../button/button";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card variant="glass" className={cn("p-8 text-center", className)}>
      {icon ? <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--surface-2))]">{icon}</div> : null}
      <h3 className="text-sm font-semibold text-[rgb(var(--text))]">{title}</h3>
      {description ? <p className="mt-2 text-sm text-[rgb(var(--muted))]">{description}</p> : null}
      {actionText && onAction ? (
        <div className="mt-4 flex justify-center">
          <Button onClick={onAction} variant="primary">
            {actionText}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
