import { Wand2, Save, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, FormField, Input, Select, Textarea, Slider, Button } from "../../../shared/ui";
import type { QuizConfig, Difficulty } from "../quizBuilder.types";
import { SUBJECTS, GRADE_LEVELS, DIFFICULTIES } from "../quizBuilder.data";
import { cn } from "../../../shared/utils/cn";

type Props = {
  variant: "surface" | "glass";
  config: QuizConfig;
  onChange: (patch: Partial<QuizConfig>) => void;

  hasQuestions: boolean;
  onOpenGenerate: () => void;
  onOpenSave: () => void;
  onOpenClear: () => void;

  theme: "light" | "dark";
};

export function QuizConfigPanel({
  variant,
  config,
  onChange,
  hasQuestions,
  onOpenGenerate,
  onOpenSave,
  onOpenClear,
  theme,
}: Props) {
  const primaryBtnClass =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  return (
    <Card variant={variant} className="p-5">
      <CardHeader>
        <CardTitle>Quiz Configuration</CardTitle>
        <CardDescription>Define quiz parameters and generate questions with AI.</CardDescription>
      </CardHeader>

      <div className="mt-4 space-y-4">
        <FormField label="Quiz Title" required>
          <Input
            value={config.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Introduction to Photosynthesis"
          />
        </FormField>

        <FormField label="Subject" required>
          <Select value={config.subject} onChange={(e) => onChange({ subject: e.target.value })}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Grade Level" required>
          <Select value={config.gradeLevel} onChange={(e) => onChange({ gradeLevel: e.target.value })}>
            {GRADE_LEVELS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-[rgb(var(--text))]">
              Number of Questions: {config.questionCount}
            </div>
          </div>
          <Slider
            min={1}
            max={20}
            step={1}
            value={config.questionCount}
            onChange={(e) => onChange({ questionCount: Number(e.target.value) })}
          />
        </div>

        <FormField label="Difficulty" required>
          <Select
            value={config.difficulty}
            onChange={(e) => onChange({ difficulty: e.target.value as Difficulty })}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="AI Prompt for Questions">
          <Textarea
            value={config.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            placeholder="Describe what you want the AI to generate..."
          />
        </FormField>

        <div className="mt-2 space-y-2">
          <Button
            className={cn("w-full", primaryBtnClass)}
            variant="ghost"
            onClick={onOpenGenerate}
            leftIcon={<Wand2 className="h-4 w-4" />}
          >
            Generate Questions with AI
          </Button>

          <Button
            className="w-full"
            variant="secondary"
            onClick={onOpenSave}
            disabled={!hasQuestions}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Quiz
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={onOpenClear}
            disabled={!hasQuestions}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Clear All Questions
          </Button>
        </div>
      </div>
    </Card>
  );
}
