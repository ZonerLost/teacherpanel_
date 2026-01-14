import { Modal, Button } from "../../../../src/shared/ui";
import type { ReportRow } from "../reports.types";

type Props = {
  open: boolean;
  onClose: () => void;
  row: ReportRow | null;
};

export function ReportPreviewModal({ open, onClose, row }: Props) {
  if (!row) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Report Preview"
      description="Preview details before downloading."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="rounded-2xl bg-[rgb(var(--surface-2))] p-4">
          <div className="text-xs text-[rgb(var(--muted))]">Report Name</div>
          <div className="mt-1 text-base font-semibold text-[rgb(var(--text))]">{row.reportName}</div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div>
              <div className="text-[11px] text-[rgb(var(--muted))]">Class</div>
              <div className="text-sm font-semibold">{row.className}</div>
            </div>
            <div>
              <div className="text-[11px] text-[rgb(var(--muted))]">Date Generated</div>
              <div className="text-sm font-semibold">{row.dateGenerated}</div>
            </div>
            <div>
              <div className="text-[11px] text-[rgb(var(--muted))]">Status</div>
              <div className="text-sm font-semibold">{row.status.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <div className="text-xs font-semibold text-[rgb(var(--text))]">Preview Area</div>
          <p className="mt-2 text-sm text-[rgb(var(--muted))]">
            Hook this to your real report viewer (PDF preview, charts, or summary).
            For now this is a placeholder panel aligned with your Figma.
          </p>
        </div>
      </div>
    </Modal>
  );
}
