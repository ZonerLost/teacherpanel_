import { Lightbulb, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, Button, EmptyState } from "../../../shared/ui";
import type { GeneratedQuestion } from "../quizBuilder.types";

type Props = {
  variant: "surface" | "glass";
  questions: GeneratedQuestion[];
  onEdit: (q: GeneratedQuestion) => void;
  onDelete: (id: string) => void;
  theme: "light" | "dark";
};

export function GeneratedQuestionsPanel({ variant, questions, onEdit, onDelete, theme }: Props) {

  return (
    <Card variant={variant} className="p-5">
      <CardHeader>
        <CardTitle>Generated Questions</CardTitle>
        <CardDescription>Edit, customize, and manage your quiz questions.</CardDescription>
      </CardHeader>

      {questions.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No questions generated yet."
            description="Use the panel on the left to define parameters and generate questions with AI."
            icon={<Lightbulb className="h-6 w-6" />}
            className="bg-transparent border-0 shadow-none"
          />
          {/* Image placeholder (matches Figma) */}
          <div className="mt-6 flex justify-center">
            <div className="h-[180px] w-[320px] rounded-2xl bg-slate-500/30 flex items-center justify-center">
              <Lightbulb className="h-10 w-10 text-yellow-300" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {questions.map((q, idx) => {
            const correct = q.choices.find((c) => c.id === q.correctChoiceId);
            return (
              <div
                key={q.id}
                className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-[rgb(var(--muted))]">
                      Question {idx + 1}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[rgb(var(--text))]">{q.question}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(q)} leftIcon={<Pencil className="h-4 w-4" />}>
                      Edit
                    </Button>
                    <button
                      type="button"
                      onClick={() => onDelete(q.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Delete question"
                    >
                      <Trash2 className="h-4 w-4 text-[rgb(var(--muted))]" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.choices.map((c) => {
                    const isCorrect = c.id === q.correctChoiceId;
                    return (
                      <div
                        key={c.id}
                        className={[
                          "rounded-2xl border px-3 py-2 text-xs",
                          isCorrect
                            ? theme === "dark"
                              ? "border-violet-400/40 bg-violet-500/10 text-white"
                              : "border-orange-500/40 bg-orange-500/10 text-slate-900"
                            : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))]/85",
                        ].join(" ")}
                      >
                        {c.text}
                      </div>
                    );
                  })}
                </div>

                {correct ? (
                  <div className="mt-3 text-xs text-[rgb(var(--muted))]">
                    Correct: <span className="font-semibold text-[rgb(var(--text))]">{correct.text}</span>
                  </div>
                ) : null}

                {q.explanation ? (
                  <div className="mt-2 text-xs text-[rgb(var(--muted))]">{q.explanation}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
