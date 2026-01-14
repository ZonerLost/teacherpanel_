import { Modal, Button } from "../../../../shared/ui";
import type { AssignmentItem } from "../../assignments.types";
import { itemTypeLabel } from "../../utils/format";

type PublishSummary = {
  name: string;
  classes: string[];
  studentGroupLabel: string;
  dueDate: string;
  dueTime: string;
  readingLevelLabel: string;
  lexile: number;
  items: AssignmentItem[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  summary: PublishSummary;
  onConfirm: () => void;
};

export function PublishConfirmModal({ open, onClose, theme, summary, onConfirm }: Props) {
  const primary =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-lime-400 text-black hover:bg-lime-300";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Publish Assignment?"
      description="Review the details below before publishing to students."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" className={primary} onClick={onConfirm}>
            Publish
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-sm text-[rgb(var(--text))]">
        <div>
          <div className="text-xs text-[rgb(var(--muted))]">Assignment</div>
          <div className="font-semibold">{summary.name}</div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">{summary.studentGroupLabel}</div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Classes</div>
            <div className="mt-1 text-sm font-semibold leading-5">{summary.classes.join(", ") || "—"}</div>
          </div>
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Due</div>
            <div className="mt-1 text-sm font-semibold">
              {summary.dueDate} at {summary.dueTime}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Reading Level</div>
          <div className="mt-1 text-sm font-semibold">
            {summary.readingLevelLabel} — {summary.lexile}L
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-[rgb(var(--text))]">Items ({summary.items.length})</div>
          <div className="space-y-2">
            {summary.items.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-3 py-2"
              >
                <div className="text-xs font-semibold text-[rgb(var(--text))]">{it.title}</div>
                <span className="text-[11px] font-semibold text-[rgb(var(--muted))]">{itemTypeLabel(it.type)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
