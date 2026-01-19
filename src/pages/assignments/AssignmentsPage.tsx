import React from "react";
import { Plus } from "lucide-react";

import { Card, Button, Input, Select } from "../../shared/ui";
import { cn } from "../../shared/utils/cn";
import { useResolvedTheme } from "../dashboard/hooks/useResolvedTheme";

import type { AssignmentItem } from "./assignments.types";
import { classOptions, initialItems, readingLevels, studentGroups } from "./assignments.data";

import { SectionTitle } from "./components/SectionTitle";
import { ClassCheckbox } from "./components/ClassCheckbox";
import { ContentItemRow } from "./components/ContentItemRow";
import { DraftSavedToast } from "./components/DraftSavedToast";

import { AddItemModal } from "./components/modals/AddItemModal";
import { PublishConfirmModal } from "./components/modals/PublishConfirmModal";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
export default function AssignmentsPage() {
  const theme = useResolvedTheme();
  const variant = theme === "dark" ? "glass" : "surface";

  // form state
  const [name, setName] = React.useState("Weekly Reading Log");
  const [description, setDescription] = React.useState(
    "Students are to log their daily reading activities and complete a short reflection."
  );

  const [selectedClasses, setSelectedClasses] = React.useState<string[]>(["grade-5-a"]);
  const [studentGroup, setStudentGroup] = React.useState("all");

  const [dueDate, setDueDate] = React.useState("2024-06-30");
  const [dueTime, setDueTime] = React.useState("23:59");

  const [readingLevel, setReadingLevel] = React.useState("intermediate");
  const [lexile, setLexile] = React.useState(900);

  const [items, setItems] = React.useState<AssignmentItem[]>(initialItems);

  // modals
  const [addOpen, setAddOpen] = React.useState(false);
  const [publishOpen, setPublishOpen] = React.useState(false);

  // draft toast
  const [draftToast, setDraftToast] = React.useState(false);
  const toastTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const onToggleClass = (id: string, checked: boolean) => {
    setSelectedClasses((prev) => {
      if (checked) return Array.from(new Set([...prev, id]));
      return prev.filter((x) => x !== id);
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));
  const addItem = (item: AssignmentItem) => setItems((prev) => [...prev, item]);

  const saveDraft = () => {
    // production: call API here (save as draft)
    setDraftToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setDraftToast(false), 2000);
  };

  const canPublish = name.trim().length > 0 && selectedClasses.length > 0 && items.length > 0;

  const addBtn =
    theme === "dark"
      ? "border-white/15 text-white/90 hover:bg-white/10"
      : "border-orange-500/40 text-orange-600 hover:bg-orange-50";

  const publishBtn =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-lime-400 text-black hover:bg-lime-300";

  const groupLabel = studentGroups.find((g) => g.value === studentGroup)?.label ?? "All Students";
  const readingLevelLabel = readingLevels.find((r) => r.value === readingLevel)?.label ?? "Intermediate";

  const summary = {
    name,
    classes: selectedClasses.map((id) => classOptions.find((c) => c.id === id)?.label ?? id),
    studentGroupLabel: groupLabel,
    dueDate,
    dueTime,
    readingLevelLabel,
    lexile,
    items,
  };

  const publish = () => {
    // production: call API here
    setPublishOpen(false);
    // Optional: show toast or redirect
    setDraftToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setDraftToast(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Assignment Details */}
      <Card variant={variant} className="p-5">
        <SectionTitle title="Assignment Details" subtitle="Provide a clear name and description for your assignment." />

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs text-[rgb(var(--muted))]">Assignment Name</label>
            <div className="mt-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs text-[rgb(var(--muted))]">Description</label>
            <div className="mt-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-4 py-3 text-sm text-[rgb(var(--text))] outline-none"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Middle grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Target Audience */}
        <Card variant={variant} className="p-5">
          <SectionTitle title="Target Audience" subtitle="Select classes or groups to assign this task." />

          <div className="mt-4">
            <div className="text-xs font-semibold text-[rgb(var(--text))]">Classes</div>
            <div className="mt-3 space-y-2">
              {classOptions.map((c) => (
                <ClassCheckbox
                  key={c.id}
                  theme={theme}
                  label={c.label}
                  checked={selectedClasses.includes(c.id)}
                  onChange={(next) => onToggleClass(c.id, next)}
                />
              ))}
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-[rgb(var(--text))]">Student Group</div>
              <div className="mt-2">
                <Select value={studentGroup} onChange={(e) => setStudentGroup(e.target.value)}>
                  {studentGroups.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Assignment Content */}
        <Card variant={variant} className="p-5">
          <SectionTitle title="Assignment Content" subtitle="Choose books or activities to include in this assignment." />

          <div className="mt-4 space-y-3">
            <div className="text-xs font-semibold text-[rgb(var(--text))]">Items Included</div>

            <div className="space-y-2">
              {items.map((it) => (
                <ContentItemRow key={it.id} item={it} theme={theme} onRemove={removeItem} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className={cn(
                "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition",
                addBtn
              )}
            >
              <Plus className="h-4 w-4" />
              Add Book/Activity
            </button>
          </div>
        </Card>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Due Date & Time */}
        <Card variant={variant} className="p-5">
          <SectionTitle title="Due Date & Time" subtitle="Set the deadline for this assignment." />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-[rgb(var(--muted))]">Due Date</label>
              <div className="mt-2">
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-xs text-[rgb(var(--muted))]">Due Time</label>
              <div className="mt-2">
                <Input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} />
              </div>
            </div>
          </div>
        </Card>

        {/* Differentiated Reading */}
        <Card variant={variant} className="p-5">
          <SectionTitle title="Differentiated Reading" subtitle="Customize reading levels for individual students or groups." />

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs text-[rgb(var(--muted))]">Default Reading Level</label>
              <div className="mt-2">
                <Select value={readingLevel} onChange={(e) => setReadingLevel(e.target.value)}>
                  {readingLevels.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-[rgb(var(--muted))]">Lexile Range:</label>
                <span className="text-xs font-semibold text-[rgb(var(--text))]">{lexile}L</span>
              </div>

              <div className="mt-2">
                <input
                  type="range"
                  min={600}
                  max={1200}
                  value={lexile}
                  onChange={(e) => setLexile(Number(e.target.value))}
                  className={cn(
                    "w-full",
                    theme === "dark" ? "accent-lime-400" : "accent-lime-500"
                  )}
                />
              </div>

              <div className="mt-2 text-[11px] text-[rgb(var(--muted))]">
                Adjust this range to fine-tune the difficulty.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Publish */}
      <Card variant={variant} className="p-5">
        <SectionTitle title="Publish Assignment" subtitle="Save your progress or publish the assignment to students." />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="outline" onClick={saveDraft}>
            Save Draft
          </Button>

          <Button
            variant="ghost"
            className={cn("rounded-2xl", publishBtn)}
            onClick={() => setPublishOpen(true)}
            disabled={!canPublish}
          >
            Publish Assignment
          </Button>
        </div>

        {!canPublish ? (
          <div className="mt-3 text-xs text-[rgb(var(--muted))]">
            To publish: add an assignment name, select at least one class, and include at least one item.
          </div>
        ) : null}
      </Card>
      <ModuleFooter
              theme={theme}
              className="w-full"
              containerClassName="max-w-screen-2xl"
            />

      {/* Modals */}
      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} theme={theme} onAdd={addItem} />

      <PublishConfirmModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        theme={theme}
        summary={summary}
        onConfirm={publish}
      />

      <DraftSavedToast show={draftToast} theme={theme} />
    </div>
  );
}
