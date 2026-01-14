import React from "react";
import { Modal, Button, FormField, Textarea, Input } from "../../../../shared/ui";
import type { GeneratedQuestion } from "../../quizBuilder.types";

type Props = {
  open: boolean;
  onClose: () => void;
  question: GeneratedQuestion | null;
  onUpdate: (q: GeneratedQuestion) => void;
  theme: "light" | "dark";
};

export function EditQuestionModal({ open, onClose, question, onUpdate, theme }: Props) {
  const [draft, setDraft] = React.useState<GeneratedQuestion | null>(question);

  React.useEffect(() => {
    if (open) setDraft(question);
  }, [open, question]);

  const primaryBtnClass =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  if (!draft) return null;

  const setChoiceText = (idx: number, text: string) => {
    const next = { ...draft, choices: draft.choices.map((c, i) => (i === idx ? { ...c, text } : c)) };
    setDraft(next);
  };

  const save = () => {
    onUpdate(draft);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Question"
      description="Update question text and choices."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={save} className={primaryBtnClass}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormField label="Question">
          <Textarea value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
        </FormField>

        <div className="grid gap-3 sm:grid-cols-2">
          {draft.choices.map((c, idx) => (
            <div key={c.id} className="space-y-2">
              <div className="text-xs font-semibold text-[rgb(var(--muted))]">Choice {idx + 1}</div>
              <Input value={c.text} onChange={(e) => setChoiceText(idx, e.target.value)} />
              <label className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
                <input
                  type="radio"
                  name="correct"
                  checked={draft.correctChoiceId === c.id}
                  onChange={() => setDraft({ ...draft, correctChoiceId: c.id })}
                />
                Mark as correct
              </label>
            </div>
          ))}
        </div>

        <FormField label="Explanation (optional)">
          <Textarea
            value={draft.explanation ?? ""}
            onChange={(e) => setDraft({ ...draft, explanation: e.target.value })}
          />
        </FormField>
      </div>
    </Modal>
  );
}
