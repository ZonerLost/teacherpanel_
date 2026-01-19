import React from "react";
import { useResolvedTheme } from "../dashboard/hooks/useResolvedTheme"; // keep consistent with your project
import type { ReportFilters, ReportRow } from "./reports.types";

import { ReportsFilterCard } from "./components/ReportsFilterCard";
import { ReportsOverviewCard } from "./components/ReportsOverviewCard";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
import { DEFAULT_FILTERS, INITIAL_REPORTS, CLASSES, STUDENTS, ASSIGNMENTS, REPORT_TYPES } from "./reports.data";
import { exportReportsCsv } from "./utils/exportCsv";
import { exportReportPdf } from "./utils/exportPdf";

import { GeneratePdfModal } from "../reports/modals/GeneratePdfModal";
import { ExportCsvModal } from "../reports/modals/ExportCsvModal";
import { DownloadReportModal } from "../reports/modals/DownloadReportModal";
import { ReportPreviewModal } from "../reports/modals/ReportPreviewModal";

export default function ReportsPage() {
  const theme = useResolvedTheme();
  const variant = theme === "dark" ? "glass" : "surface";

  const [filters, setFilters] = React.useState<ReportFilters>(DEFAULT_FILTERS);
  const patchFilters = (patch: Partial<ReportFilters>) => setFilters((p) => ({ ...p, ...patch }));

  const [rows, setRows] = React.useState<ReportRow[]>(INITIAL_REPORTS);

  // modals
  const [genOpen, setGenOpen] = React.useState(false);
  const [csvOpen, setCsvOpen] = React.useState(false);
  const [downloadOpen, setDownloadOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const [activeRow, setActiveRow] = React.useState<ReportRow | null>(null);

  const addGeneratedRow = (row: ReportRow) => setRows((prev) => [row, ...prev]);

  const handleExportCsv = () => exportReportsCsv(rows, filters);

  const handleDownloadRow = (row: ReportRow) => {
    setActiveRow(row);
    setDownloadOpen(true);
  };

  const handlePreviewRow = (row: ReportRow) => {
    setActiveRow(row);
    setPreviewOpen(true);
  };

  const downloadRowPdf = () => {
    if (!activeRow) return;
    exportReportPdf(activeRow, filters);
  };

  const downloadRowCsv = () => {
    if (!activeRow) return;
    // export just a single row as csv
    exportReportsCsv([activeRow], filters);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[rgb(var(--text))]">Reports & Exports</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
        <ReportsFilterCard
          variant={variant}
          filters={filters}
          onChange={patchFilters}
          classOptions={CLASSES as unknown as string[]}
          studentOptions={STUDENTS as unknown as string[]}
          assignmentOptions={ASSIGNMENTS as unknown as string[]}
          reportTypeOptions={REPORT_TYPES as unknown as string[]}
          onGeneratePdf={() => setGenOpen(true)}
          onExportCsv={() => setCsvOpen(true)}
          theme={theme}
        />

        <ReportsOverviewCard
          variant={variant}
          rows={rows}
          onDownload={handleDownloadRow}
          onPreview={handlePreviewRow}
        />
      </div>
      <ModuleFooter
        theme={theme}
        className="w-full"
        containerClassName="max-w-screen-2xl"
      />

      {/* Modals */}
      <GeneratePdfModal
        open={genOpen}
        onClose={() => setGenOpen(false)}
        filters={filters}
        theme={theme}
        onGenerated={addGeneratedRow}
        onExportPdf={(row) => exportReportPdf(row, filters)}
      />

      <ExportCsvModal
        open={csvOpen}
        onClose={() => setCsvOpen(false)}
        filters={filters}
        theme={theme}
        onExport={handleExportCsv}
      />

      <DownloadReportModal
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        row={activeRow}
        onDownloadPdf={downloadRowPdf}
        onDownloadCsv={downloadRowCsv}
      />

      <ReportPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        row={activeRow}
      />
    </div>
  );
}
