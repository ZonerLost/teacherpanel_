import React from "react";
import { Modal, Button, FormField, Input } from "../../../../shared/ui";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultName: string;
  onSave: (name: string) => Promise<void>;
  theme: "light" | "dark";
};

export function SaveQuizModal({ open, onClose, defaultName, onSave, theme }: Props) {
  const [name, setName] = React.useState(defaultName);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) setName(defaultName);
  }, [open, defaultName]);

  const primaryBtnClass =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  const canSave = name.trim().length > 0;

  const doSave = async () => {
    if (!canSave) return;
    setLoading(true);
    try {
      await onSave(name.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => (loading ? null : onClose())}
      title="Save Quiz"
      description="Save your quiz configuration and generated questions."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={doSave}
            disabled={!canSave || loading}
            className={primaryBtnClass}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <FormField label="Quiz Name" required>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Quiz name" />
      </FormField>

      <p className="mt-3 text-xs text-[rgb(var(--muted))]">
        This is UI-only for now. Hook this to your API when ready.
      </p>
    </Modal>
  );
}
