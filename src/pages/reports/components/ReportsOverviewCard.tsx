import { Card, CardHeader, CardTitle, CardDescription } from "../../../shared/ui";
import type { ReportRow } from "../reports.types";
import { RecentReportTable } from "./RecentReportTable";

type Props = {
  variant: "surface" | "glass";
  rows: ReportRow[];
  onDownload: (row: ReportRow) => void;
  onPreview: (row: ReportRow) => void;
};

export function ReportsOverviewCard({ variant, rows, onDownload, onPreview }: Props) {
  return (
    <Card variant={variant} className="p-5">
      <CardHeader>
        <CardTitle>Report Overview</CardTitle>
        <CardDescription>Summaries and recently generated reports.</CardDescription>
      </CardHeader>

      {/* Preview banner (matches your big image section) */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]">
        <div className="relative h-[160px] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-slate-200/20 to-orange-300/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-black/10 px-4 py-2 text-sm font-semibold text-[rgb(var(--text))]">
              Curriculum Alignment Report Preview
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[rgb(var(--text))]">Recent Report History</h3>
        <RecentReportTable rows={rows} onDownload={onDownload} onPreview={onPreview} />
      </div>
    </Card>
  );
}
