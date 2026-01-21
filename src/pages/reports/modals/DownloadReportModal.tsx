import { Modal, Button } from "../../../../src/shared/ui";
import type { ReportRow } from "../reports.types";
import { cn } from "../../../shared/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  row: ReportRow | null;
  onDownloadPdf: () => void;
  onDownloadCsv: () => void;
  theme?: "light" | "dark"; // optional if you want rings to match theme
};

export function DownloadReportModal({
  open,
  onClose,
  row,
  onDownloadPdf,
  onDownloadCsv,
  theme = "light",
}: Props) {
  if (!row) return null;

  const disabled = row.status !== "generated";

  const pdfBg = theme === "dark" ? "#7C3AED" : "#6D28D9";
  const csvBg = "#F97316";

  const pdfRing =
    theme === "dark"
      ? "focus-visible:ring-violet-500/30"
      : "focus-visible:ring-violet-600/25";

  const csvRing =
    theme === "dark"
      ? "focus-visible:ring-orange-500/30"
      : "focus-visible:ring-orange-500/25";

  const btnBase = (ringCls: string) =>
    cn(
      "h-11 rounded-2xl px-4 font-semibold",
      "!text-white",
      "shadow-sm",
      "hover:brightness-95 active:brightness-90",
      "focus-visible:outline-none focus-visible:ring-4",
      ringCls,
      "disabled:cursor-not-allowed disabled:opacity-60"
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Download Report"
      description="Choose a format to download."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-3">
          <div className="text-xs text-[rgb(var(--muted))]">Report</div>
          <div className="font-semibold text-[rgb(var(--text))]">{row.reportName}</div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">
            {row.className} • {row.dateGenerated} • {row.status.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            variant="ghost"
            className={btnBase(pdfRing)}
            style={{ backgroundColor: pdfBg }}
            onClick={onDownloadPdf}
            disabled={disabled}
          >
            Download PDF
          </Button>

          <Button
            variant="ghost"
            className={btnBase(csvRing)}
            style={{ backgroundColor: csvBg }}
            onClick={onDownloadCsv}
            disabled={disabled}
          >
            Download CSV
          </Button>
        </div>

        {disabled ? (
          <p className="text-xs text-[rgb(var(--muted))]">
            This report is not generated yet. Downloads are available once status is <b>Generated</b>.
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
