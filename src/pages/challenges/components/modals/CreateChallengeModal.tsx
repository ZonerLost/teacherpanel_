import React from "react";
import { Modal, Button, Input, FormField, Select } from "../../../../shared/ui";
import type { Challenge, ChallengeStatus } from "../../challenges.types";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  onCreate: (challenge: Challenge) => void;
};

function makeId() {
  return `ch-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

function inferStatus(dueDate: string): ChallengeStatus {
  const due = new Date(dueDate).getTime();
  const now = Date.now();
  if (Number.isNaN(due)) return "upcoming";
  if (due < now) return "completed";
  // if due is in future, treat as active (matches your UI where active cards exist with future due dates)
  return "active";
}

export function CreateChallengeModal({ open, onClose, theme, onCreate }: Props) {
  const [title, setTitle] = React.useState("");
  const [participantsCount, setParticipantsCount] = React.useState(20);
  const [dueDate, setDueDate] = React.useState("2024-06-30");
  const [description, setDescription] = React.useState("");
  const [progressPct, setProgressPct] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    setTitle("");
    setParticipantsCount(20);
    setDueDate("2024-06-30");
    setDescription("");
    setProgressPct(0);
  }, [open]);

  const primary =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  const submit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const challenge: Challenge = {
      id: makeId(),
      title: cleanTitle,
      participantsCount: Math.max(0, participantsCount),
      dueDate,
      progressPct: Math.max(0, Math.min(100, progressPct)),
      status: inferStatus(dueDate),
      description: description.trim() || "New reading challenge created from teacher panel.",
    };

    onCreate(challenge);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Challenge"
      description="Set up a new reading challenge for your class."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" className={primary} onClick={submit} disabled={!title.trim()}>
            Create Challenge
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormField label="Challenge Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Spring Reading Spree" />
        </FormField>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField label="Students Participating">
            <Input
              type="number"
              value={participantsCount}
              onChange={(e) => setParticipantsCount(Number(e.target.value))}
              min={0}
            />
          </FormField>

          <FormField label="Due Date">
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Initial Progress (%)">
          <Select value={String(progressPct)} onChange={(e) => setProgressPct(Number(e.target.value))}>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
              <option key={v} value={String(v)}>
                {v}%
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-4 py-3 text-sm text-[rgb(var(--text))] outline-none"
            placeholder="Short description of the challenge..."
          />
        </FormField>
      </div>
    </Modal>
  );
}
