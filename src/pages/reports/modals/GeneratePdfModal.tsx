import React from "react";
import { Modal, Button } from "../../../../src/shared/ui";
import type { ReportFilters, ReportRow } from "../reports.types";
import { cn } from "../../../shared/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  filters: ReportFilters;
  theme: "light" | "dark";
  onGenerated: (row: ReportRow) => void;
  onExportPdf: (row: ReportRow) => void;
};

export function GeneratePdfModal({
  open,
  onClose,
  filters,
  theme,
  onGenerated,
  onExportPdf,
}: Props) {
  const [loading, setLoading] = React.useState(false);

  const primaryBg = theme === "dark" ? "#7C3AED" : "#6D28D9"; // violet-600 / violet-700
  const primaryRing =
    theme === "dark"
      ? "focus-visible:ring-violet-500/30"
      : "focus-visible:ring-violet-600/25";

  const primaryBtnClass = cn(
    "h-11 rounded-2xl px-5 font-semibold",
    "!text-white",
    "shadow-sm",
    "hover:brightness-95 active:brightness-90",
    "focus-visible:outline-none focus-visible:ring-4",
    primaryRing,
    "disabled:cursor-not-allowed disabled:opacity-60"
  );

  const doGenerate = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));

      const today = new Date();
      const iso = today.toISOString().slice(0, 10);

      const row: ReportRow = {
        id: `gen-${Date.now()}`,
        reportName: `${filters.reportType}`,
        className: filters.className,
        dateGenerated: iso,
        status: "generated",
      };

      onGenerated(row);
      onExportPdf(row);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => (loading ? null : onClose())}
      title="Generate & Export PDF"
      description="Confirm your filters to generate the PDF report."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            variant="ghost"
            className={primaryBtnClass}
            style={{ backgroundColor: primaryBg }}
            onClick={doGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate PDF"}
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Class</div>
          <div className="font-semibold">{filters.className}</div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Student</div>
            <div className="font-semibold">{filters.student}</div>
          </div>

          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Assignment</div>
            <div className="font-semibold">{filters.assignment}</div>
          </div>

          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Report Type</div>
            <div className="font-semibold">{filters.reportType}</div>
          </div>

          <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
            <div className="text-xs text-[rgb(var(--muted))]">Date Range</div>
            <div className="font-semibold">
              {filters.dateFrom} → {filters.dateTo}
            </div>
          </div>
        </div>

        <p className="text-xs text-[rgb(var(--muted))]">
          Replace this simulated generation with your backend endpoint later (recommended).
        </p>
      </div>
    </Modal>
  );
}
