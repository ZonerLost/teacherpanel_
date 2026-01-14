import { CalendarDays, Users } from "lucide-react";
import { Modal, Button } from "../../../../shared/ui";
import type { Challenge } from "../../challenges.types";
import { formatDueDate, statusLabel } from "../../utils/format";

type Props = {
  open: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  onMarkCompleted: (id: string) => void;
};

function Progress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-[rgb(var(--surface-2))]">
      <div
        className="h-2 rounded-full bg-[rgb(var(--accent))]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ChallengeDetailsModal({ open, onClose, challenge, onMarkCompleted }: Props) {
  if (!challenge) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Challenge Details"
        description="Select a challenge to view details."
        size="sm"
        footer={
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        }
      >
        <div className="text-sm text-[rgb(var(--muted))]">
          Choose a challenge from the list to view its details.
        </div>
      </Modal>
    );
  }

  const completed = challenge.status === "completed";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={challenge.title}
      description={statusLabel(challenge.status)}
      size="md"
      footer={
        <div className="flex w-full justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!completed && (
            <Button
              variant="ghost"
              className="bg-[rgb(var(--accent))] text-black hover:brightness-95"
              onClick={() => onMarkCompleted(challenge.id)}
            >
              Mark as Completed
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-4 text-[rgb(var(--text))]">
        <p className="text-sm text-[rgb(var(--muted))]">{challenge.description}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3 text-sm">
            <div className="text-[rgb(var(--muted))]">Due Date</div>
            <div className="mt-1 inline-flex items-center gap-2 font-semibold">
              <CalendarDays className="h-4 w-4 text-[rgb(var(--muted))]" />
              {formatDueDate(challenge.dueDate)}
            </div>
          </div>

          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3 text-sm">
            <div className="text-[rgb(var(--muted))]">Participants</div>
            <div className="mt-1 inline-flex items-center gap-2 font-semibold">
              <Users className="h-4 w-4 text-[rgb(var(--muted))]" />
              {challenge.participantsCount} students
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-[rgb(var(--muted))]">
            <span>Progress</span>
            <span className="font-semibold text-[rgb(var(--text))]">{challenge.progressPct}%</span>
          </div>
          <Progress value={challenge.progressPct} />
        </div>
      </div>
    </Modal>
  );
}
