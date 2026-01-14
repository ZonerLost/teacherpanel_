
import { Modal } from "./Modal";
import { Button } from "../button/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: "danger" | "primary";
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  tone = "primary",
  onConfirm,
  onClose,
  loading,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Working..." : confirmText}
          </Button>
        </>
      }
    >
      <div className="text-sm text-[rgb(var(--muted))]">
        {description ?? "Are you sure you want to continue?"}
      </div>
    </Modal>
  );
}
