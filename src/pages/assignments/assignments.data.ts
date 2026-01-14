import type { AssignmentItem, ClassOption, ReadingLevelOption, StudentGroupOption } from "./assignments.types";

export const classOptions: ClassOption[] = [
  { id: "grade-5-a", label: "Grade 5 - A" },
  { id: "grade-5-b", label: "Grade 5 - B" },
  { id: "grade-6-a", label: "Grade 6 - A" },
  { id: "grade-6-b", label: "Grade 6 - B" },
];

export const studentGroups: StudentGroupOption[] = [
  { value: "all", label: "All Students" },
  { value: "group-a", label: "Group A" },
  { value: "group-b", label: "Group B" },
];

export const readingLevels: ReadingLevelOption[] = [
  { value: "beginner", label: "Beginner (Lexile 300-600L)" },
  { value: "intermediate", label: "Intermediate (Lexile 600-900L)" },
  { value: "advanced", label: "Advanced (Lexile 900-1200L)" },
];

export const initialItems: AssignmentItem[] = [
  { id: "it1", type: "book", title: "The Secret Garden" },
  { id: "it2", type: "activity", title: "Reading Comprehension Quiz" },
];
