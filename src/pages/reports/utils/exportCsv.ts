import type { ReportRow, ReportFilters } from "../reports.types";

function escapeCsv(value: string) {
  const v = value ?? "";
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function exportReportsCsv(rows: ReportRow[], filters: ReportFilters) {
  const header = ["Report Name", "Class", "Date Generated", "Status"];
  const lines = [
    ["Filters", "", "", ""],
    ["Class", filters.className, "", ""],
    ["Student", filters.student, "", ""],
    ["Assignment", filters.assignment, "", ""],
    ["Report Type", filters.reportType, "", ""],
    ["Date From", filters.dateFrom, "", ""],
    ["Date To", filters.dateTo, "", ""],
    ["", "", "", ""],
    header,
    ...rows.map((r) => [r.reportName, r.className, r.dateGenerated, r.status]),
  ];

  const csv = lines.map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reports-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
