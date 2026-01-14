import jsPDF from "jspdf";
import type { ReportFilters, ReportRow } from "../reports.types";

export function exportReportPdf(row: ReportRow, filters?: ReportFilters) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Curriculum Alignment Report", 40, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Report Name: ${row.reportName}`, 40, 85);
  doc.text(`Class: ${row.className}`, 40, 105);
  doc.text(`Date Generated: ${row.dateGenerated}`, 40, 125);
  doc.text(`Status: ${row.status.toUpperCase()}`, 40, 145);

  if (filters) {
    doc.setFont("helvetica", "bold");
    doc.text("Filters", 40, 180);

    doc.setFont("helvetica", "normal");
    const lines = [
      `Class: ${filters.className}`,
      `Student: ${filters.student}`,
      `Assignment: ${filters.assignment}`,
      `Report Type: ${filters.reportType}`,
      `Date Range: ${filters.dateFrom} → ${filters.dateTo}`,
    ];
    lines.forEach((l, i) => doc.text(l, 40, 205 + i * 16));
  }

  doc.setFontSize(10);
  doc.text("Generated from Teacher Panel", 40, 780);

  doc.save(`${row.reportName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`);
}
