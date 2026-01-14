export type ReportStatus = "generated" | "pending" | "failed";

export type ReportFilters = {
  className: string;
  student: string;
  assignment: string;
  reportType: string;
  dateFrom: string; // YYYY-MM-DD
  dateTo: string;   // YYYY-MM-DD
};

export type ReportRow = {
  id: string;
  reportName: string;
  className: string;
  dateGenerated: string; // YYYY-MM-DD
  status: ReportStatus;
};
