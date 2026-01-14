/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "../../utils/cn";

export type Column<T> = {
  header: string;
  key?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T, index: number) => string;
  emptyText?: string;
  className?: string;
};

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  emptyText = "No records found.",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-2xl)] border", "border-[rgb(var(--border))] bg-[rgb(var(--surface))]", className)}>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-[rgb(var(--surface-2))]">
          <tr>
            {columns.map((c) => (
              <th
                key={c.header}
                className={cn(
                  "px-4 py-3 text-xs font-semibold text-[rgb(var(--muted))]",
                  c.headerClassName
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-[rgb(var(--muted))]">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={rowKey(row, i)}
                className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60"
              >
                {columns.map((c) => {
                  const content =
                    c.render ? c.render(row) : c.key ? (row[c.key] as any) : null;

                  return (
                    <td key={c.header} className={cn("px-4 py-3 text-[rgb(var(--text))]", c.className)}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
