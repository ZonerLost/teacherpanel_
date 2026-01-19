import React from "react";
import { ConfirmDialog } from "../../shared/ui";
import { useResolvedTheme } from "../dashboard/hooks/useResolvedTheme";
import type { QuizConfig, GeneratedQuestion } from "./quizBuilder.types";
import { defaultPrompt, mockGenerateQuestions } from "./quizBuilder.data";

import { QuizConfigPanel } from "./components/QuizConfigPanel";
import { GeneratedQuestionsPanel } from "./components/GeneratedQuestionsPanel";
import { GenerateQuestionsModal } from "./components/modals/GenerateQuestionsModal";
import { SaveQuizModal } from "./components/modals/SaveQuizModal";
import { EditQuestionModal } from "./components/modals/EditQuestionModal";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
export default function QuizBuilderPage() {
  const theme = useResolvedTheme();
  const variant = theme === "dark" ? "glass" : "surface";

  const [config, setConfig] = React.useState<QuizConfig>({
    title: "Introduction to Photosynthesis",
    subject: "Biology",
    gradeLevel: "Grade 7",
    questionCount: 5,
    difficulty: "Medium",
    prompt: defaultPrompt,
  });

  const [questions, setQuestions] = React.useState<GeneratedQuestion[]>([]);

  // modals
  const [generateOpen, setGenerateOpen] = React.useState(false);
  const [saveOpen, setSaveOpen] = React.useState(false);
  const [clearOpen, setClearOpen] = React.useState(false);

  // edit modal
  const [editOpen, setEditOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<GeneratedQuestion | null>(null);

  const patchConfig = (patch: Partial<QuizConfig>) => setConfig((prev) => ({ ...prev, ...patch }));

  const generate = async () => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));
    return mockGenerateQuestions(config.questionCount);
  };

  const onGenerated = (items: GeneratedQuestion[]) => {
    setQuestions(items);
  };

  const onSave = async (name: string) => {
    // Simulate save call
    await new Promise((r) => setTimeout(r, 700));
    console.log("Saved quiz:", name, { config, questions });
  };

  const onClear = () => {
    setQuestions([]);
    setClearOpen(false);
  };

  const onEdit = (q: GeneratedQuestion) => {
    setEditing(q);
    setEditOpen(true);
  };

  const onUpdate = (q: GeneratedQuestion) => {
    setQuestions((prev) => prev.map((x) => (x.id === q.id ? q : x)));
  };

  const onDelete = (id: string) => {
    setQuestions((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Responsive two-panel layout like Figma */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <QuizConfigPanel
          variant={variant}
          config={config}
          onChange={patchConfig}
          hasQuestions={questions.length > 0}
          onOpenGenerate={() => setGenerateOpen(true)}
          onOpenSave={() => setSaveOpen(true)}
          onOpenClear={() => setClearOpen(true)}
          theme={theme}
        />

        <GeneratedQuestionsPanel
          variant={variant}
          questions={questions}
          onEdit={onEdit}
          onDelete={onDelete}
          theme={theme}
        />

      </div>
      <ModuleFooter
        theme={theme}
        className="w-full"
        containerClassName="max-w-screen-2xl"
      />
      {/* Modals */}
      <GenerateQuestionsModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        config={config}
        onGenerate={generate}
        onGenerated={onGenerated}
        theme={theme}
      />

      <SaveQuizModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        defaultName={config.title}
        onSave={onSave}
        theme={theme}
      />

      <EditQuestionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        question={editing}
        onUpdate={onUpdate}
        theme={theme}
      />

      <ConfirmDialog
        open={clearOpen}
        title="Clear all questions?"
        description="This will remove all generated questions from the panel. You can generate again anytime."
        confirmText="Clear"
        cancelText="Cancel"
        tone="danger"
        onConfirm={onClear}
        onClose={() => setClearOpen(false)}
      />
    </div>
  );
}
