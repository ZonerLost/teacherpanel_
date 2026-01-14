import { X } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import type { AssignmentItem } from "../assignments.types";
import { itemTypeLabel } from "../utils/format";

type Props = {
  item: AssignmentItem;
  theme: "light" | "dark";
  onRemove: (id: string) => void;
};

export function ContentItemRow({ item, theme, onRemove }: Props) {
  const pill =
    item.type === "book"
      ? theme === "dark"
        ? "bg-violet-500/15 text-violet-200 border-violet-400/20"
        : "bg-orange-500 text-white border-orange-500"
      : theme === "dark"
        ? "bg-slate-500/15 text-slate-200 border-slate-300/20"
        : "bg-orange-500 text-white border-orange-500";

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-4 py-3">
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold text-[rgb(var(--text))]">{item.title}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className={cn("rounded-full border px-2 py-1 text-[10px] font-bold", pill)}>
          {itemTypeLabel(item.type)}
        </span>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded-lg p-2 text-[rgb(var(--muted))] hover:bg-black/5"
          aria-label="Remove item"
          title="Remove"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
