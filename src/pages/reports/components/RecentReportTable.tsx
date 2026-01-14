import { Download, Eye } from "lucide-react";
import type { ReportRow } from "../reports.types";
import { cn } from "../../../shared/utils/cn";

function StatusPill({ status }: { status: ReportRow["status"] }) {
  const cls =
    status === "generated"
      ? "bg-orange-500/15 text-orange-500 border-orange-500/25"
      : status === "pending"
        ? "bg-slate-500/15 text-slate-400 border-slate-400/25"
        : "bg-red-500/15 text-red-500 border-red-500/25";

  const label = status === "generated" ? "Generated" : status === "pending" ? "Pending" : "Failed";

  return <span className={cn("inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold", cls)}>{label}</span>;
}

type Props = {
  rows: ReportRow[];
  onDownload: (row: ReportRow) => void;
  onPreview: (row: ReportRow) => void;
};

export function RecentReportTable({ rows, onDownload, onPreview }: Props) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-[rgb(var(--border))]">
      <table className="w-full text-left text-xs">
        <thead className="bg-[rgb(var(--surface-2))]">
          <tr>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Report Name</th>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Class</th>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Date Generated</th>
            <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Status</th>
            <th className="px-3 py-2 text-right text-[11px] font-semibold text-[rgb(var(--muted))]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[rgb(var(--border))]">
              <td className="px-3 py-3 text-[rgb(var(--text))]">{r.reportName}</td>
              <td className="px-3 py-3 text-[rgb(var(--text))]/80">{r.className}</td>
              <td className="px-3 py-3 text-[rgb(var(--text))]/80">{r.dateGenerated}</td>
              <td className="px-3 py-3">
                <StatusPill status={r.status} />
              </td>
              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onDownload(r)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--surface-2))] hover:opacity-90"
                    aria-label="Download"
                  >
                    <Download className="h-4 w-4 text-[rgb(var(--text))]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onPreview(r)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--surface-2))] hover:opacity-90"
                    aria-label="Preview"
                  >
                    <Eye className="h-4 w-4 text-[rgb(var(--text))]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
