import React from "react";
import { Modal, Button } from "../../../../shared/ui";

type Props = {
  open: boolean;
  onClose: () => void;
  onAttachText: (text: string) => void;
};

export function AttachFileModal({ open, onClose, onAttachText }: Props) {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (!open) setFile(null);
  }, [open]);

  const onConfirm = () => {
    if (!file) return;
    // In real app: upload file, then attach as URL.
    onAttachText(`[Attachment] ${file.name}`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Attach File"
      description="Choose a file to attach (UI-only for now)."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={!file}>
            Attach
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3 text-sm text-[rgb(var(--text))]"
        />
        {file ? (
          <div className="text-xs text-[rgb(var(--muted))]">
            Selected: <span className="font-semibold text-[rgb(var(--text))]">{file.name}</span>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
