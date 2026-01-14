export type AssignmentItemType = "book" | "activity";

export type AssignmentItem = {
  id: string;
  type: AssignmentItemType;
  title: string;
};

export type ClassOption = {
  id: string;
  label: string; // "Grade 5 - A"
};

export type StudentGroupOption = {
  value: string;
  label: string;
};

export type ReadingLevelOption = {
  value: string;
  label: string;
};
