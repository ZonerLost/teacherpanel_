import { Modal, Button } from "../../../../shared/ui";
import type { Conversation } from "../../messaging.types";

type Props = {
  open: boolean;
  onClose: () => void;
  conversation: Conversation | null;

  onToggleArchive: () => void;
  onMarkUnread: () => void;
};

export function ContactInfoModal({ open, onClose, conversation, onToggleArchive, onMarkUnread }: Props) {
  if (!conversation) return null;

  const archived = conversation.status === "archived";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Contact Info"
      description="Details and quick actions for this conversation."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Name</div>
          <div className="text-sm font-semibold text-[rgb(var(--text))]">{conversation.participant.name}</div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">{conversation.participant.subtitle}</div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Button variant="secondary" onClick={onMarkUnread}>
            Mark Unread
          </Button>
          <Button variant={archived ? "primary" : "outline"} onClick={onToggleArchive}>
            {archived ? "Unarchive" : "Archive"}
          </Button>
        </div>

        <p className="text-xs text-[rgb(var(--muted))]">
          Hook these actions to your backend later (archive/unread endpoints).
        </p>
      </div>
    </Modal>
  );
}
