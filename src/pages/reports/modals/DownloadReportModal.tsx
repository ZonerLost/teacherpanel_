import { Modal, Button } from "../../../../src/shared/ui";
import type { ReportRow } from "../reports.types";

type Props = {
  open: boolean;
  onClose: () => void;
  row: ReportRow | null;
  onDownloadPdf: () => void;
  onDownloadCsv: () => void;
};

export function DownloadReportModal({ open, onClose, row, onDownloadPdf, onDownloadCsv }: Props) {
  if (!row) return null;

  const disabled = row.status !== "generated";

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
          <Button variant="primary" onClick={onDownloadPdf} disabled={disabled}>
            Download PDF
          </Button>
          <Button variant="secondary" onClick={onDownloadCsv} disabled={disabled}>
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
