import React from "react";
import { Modal, Button, Input, FormField, Select } from "../../../../shared/ui";
import type { AssignmentItem, AssignmentItemType } from "../../assignments.types";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  onAdd: (item: AssignmentItem) => void;
};

function makeId() {
  return `it-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

export function AddItemModal({ open, onClose, theme, onAdd }: Props) {
  const [type, setType] = React.useState<AssignmentItemType>("book");
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setType("book");
    setTitle("");
  }, [open]);

  const primary =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  const submit = () => {
    const t = title.trim();
    if (!t) return;
    onAdd({ id: makeId(), type, title: t });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Book/Activity"
      description="Add content to include in this assignment."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" className={primary} onClick={submit} disabled={!title.trim()}>
            Add
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormField label="Type">
          <Select value={type} onChange={(e) => setType(e.target.value as AssignmentItemType)}>
            <option value="book">Book</option>
            <option value="activity">Activity</option>
          </Select>
        </FormField>

        <FormField label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Secret Garden" />
        </FormField>
      </div>
    </Modal>
  );
}
