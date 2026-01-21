import React from "react";
import { Modal, Button } from "../../../../shared/ui";
import type { QuizConfig, GeneratedQuestion } from "../../quizBuilder.types";

type Props = {
  open: boolean;
  onClose: () => void;
  config: QuizConfig;
  onGenerate: () => Promise<GeneratedQuestion[]>;
  onGenerated: (items: GeneratedQuestion[]) => void;
  theme: "light" | "dark";
};

export function GenerateQuestionsModal({
  open,
  onClose,
  config,
  onGenerate,
  onGenerated,
  theme,
}: Props) {
  const [loading, setLoading] = React.useState(false);

  const canGenerate =
    config.title.trim().length > 0 && config.prompt.trim().length > 0;

  const primaryBg = theme === "dark" ? "#7C3AED" : "#F97316"; // violet / orange
  const primaryRing =
    theme === "dark"
      ? "focus-visible:ring-violet-500/30"
      : "focus-visible:ring-orange-500/25";

  const primaryBtnClass = [
    "min-w-[120px] rounded-2xl",
    "!text-white",
    "hover:brightness-95 active:brightness-90",
    "focus-visible:outline-none focus-visible:ring-4",
    primaryRing,
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ");

  const doGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    try {
      const items = await onGenerate();
      onGenerated(items);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => (loading ? null : onClose())}
      title="Generate Questions"
      description="Confirm your settings before generating questions with AI."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          {/* Always-visible primary button (light + dark) */}
          <Button
            variant="ghost"
            onClick={doGenerate}
            disabled={!canGenerate || loading}
            className={primaryBtnClass}
            style={{ backgroundColor: primaryBg }}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Quiz Title</div>
          <div className="font-semibold">{config.title}</div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Subject</div>
            <div className="font-semibold">{config.subject}</div>
          </div>
          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Grade Level</div>
            <div className="font-semibold">{config.gradeLevel}</div>
          </div>
          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Questions</div>
            <div className="font-semibold">{config.questionCount}</div>
          </div>
          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Difficulty</div>
            <div className="font-semibold">{config.difficulty}</div>
          </div>
        </div>

        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Prompt</div>
          <div className="mt-1 whitespace-pre-wrap text-sm text-[rgb(var(--text))]/90">
            {config.prompt}
          </div>
        </div>

        {!canGenerate ? (
          <div className="text-xs text-red-500">
            Please enter a Quiz Title and Prompt before generating.
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
