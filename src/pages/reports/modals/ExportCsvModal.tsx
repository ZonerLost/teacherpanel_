import React from "react";
import { Modal, Button } from "../../../../src/shared/ui";
import type { ReportFilters } from "../reports.types";
import { cn } from "../../../shared/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  filters: ReportFilters;
  theme: "light" | "dark";
  onExport: () => void;
};

export function ExportCsvModal({ open, onClose, filters, theme, onExport }: Props) {
  const [loading, setLoading] = React.useState(false);

  const primaryBg = "#F97316"; // orange-500
  const primaryRing =
    theme === "dark"
      ? "focus-visible:ring-orange-500/30"
      : "focus-visible:ring-orange-500/25";

  const primaryBtnClass = cn(
    "h-11 rounded-2xl px-5 font-semibold",
    "!text-white",
    "shadow-sm",
    "hover:brightness-95 active:brightness-90",
    "focus-visible:outline-none focus-visible:ring-4",
    primaryRing,
    "disabled:cursor-not-allowed disabled:opacity-60"
  );

  const doExport = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      onExport();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => (loading ? null : onClose())}
      title="Export CSV"
      description="Export report history as a CSV file."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            variant="ghost"
            className={primaryBtnClass}
            style={{ backgroundColor: primaryBg }}
            onClick={doExport}
            disabled={loading}
          >
            {loading ? "Exporting..." : "Export CSV"}
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Filters applied</div>

          <div className="mt-1 text-sm text-[rgb(var(--text))]/90">
            {filters.className} • {filters.student} • {filters.reportType}
          </div>

          <div className="mt-1 text-xs text-[rgb(var(--muted))]">
            {filters.dateFrom} → {filters.dateTo}
          </div>
        </div>
      </div>
    </Modal>
  );
}
