import type { ReportFilters, ReportRow } from "./reports.types";

export const CLASSES = ["Grade 5 - A", "Grade 5 - B", "Grade 6 - C"] as const;
export const STUDENTS = ["All Students", "John Doe", "Emily Chen", "Oliver Green"] as const;
export const ASSIGNMENTS = ["All Assignments", "Unit 1", "Unit 2", "Reading Comprehension"] as const;
export const REPORT_TYPES = ["Overall Progress Summary", "Vocabulary Quiz Results", "Reading Insights"] as const;

export const DEFAULT_FILTERS: ReportFilters = {
  className: "Grade 5 - A",
  student: "All Students",
  assignment: "All Assignments",
  reportType: "Overall Progress Summary",
  dateFrom: "2024-01-01",
  dateTo: "2024-03-31",
};

export const INITIAL_REPORTS: ReportRow[] = [
  { id: "r1", reportName: "Q1 Progress Overview", className: "Grade 5 - A", dateGenerated: "2024-03-30", status: "generated" },
  { id: "r2", reportName: "Vocabulary Quiz #3 Results", className: "Grade 5 - B", dateGenerated: "2024-03-25", status: "generated" },
  { id: "r3", reportName: "Assignment Completion: Unit 2", className: "Grade 6 - C", dateGenerated: "2024-03-20", status: "pending" },
  { id: "r4", reportName: "Reading Comprehension Summary", className: "Grade 5 - A", dateGenerated: "2024-03-15", status: "generated" },
  { id: "r5", reportName: "Student Performance: John Doe", className: "Grade 5 - A", dateGenerated: "2024-03-10", status: "generated" },
];
