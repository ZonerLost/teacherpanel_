import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../shared/ui";
import type { ReportRow } from "../reports.types";
import { RecentReportTable } from "./RecentReportTable";

type Props = {
  variant: "surface" | "glass";
  rows: ReportRow[];
  onDownload: (row: ReportRow) => void;
  onPreview: (row: ReportRow) => void;

  /** Optional: pass your real banner URL later */
  previewImageUrl?: string;
  previewTitle?: string;
};

const DEFAULT_PREVIEW_IMAGE =
  "/images/contain.png";

export function ReportsOverviewCard({
  variant,
  rows,
  onDownload,
  onPreview,
  previewImageUrl = DEFAULT_PREVIEW_IMAGE,
  // previewTitle = "Curriculum Alignment Report Preview",
}: Props) {
  return (
    <Card variant={variant} className="p-4 sm:p-5">
      <CardHeader className="p-0">
        <CardTitle>Report Overview</CardTitle>
        <CardDescription>Summaries and recently generated reports.</CardDescription>
      </CardHeader>

      {/* Preview banner */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]">
        <div className="relative w-full">
          {/* Responsive height */}
          <div className="h-[140px] w-full sm:h-[160px] md:h-[200px] lg:h-[240px]">
            {/* Background image */}
            <img
              src={previewImageUrl}
              // alt={previewTitle}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlays to match your UI */}
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/25 via-transparent to-slate-900/20" />

            {/* Center title */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              {/* <div className="max-w-[90%] rounded-2xl bg-white/35 px-4 py-2 text-center backdrop-blur-md">
                <div className="text-base font-extrabold text-slate-900 sm:text-lg md:text-xl">
                  {previewTitle}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Recent table */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[rgb(var(--text))]">
          Recent Report History
        </h3>
        <RecentReportTable rows={rows} onDownload={onDownload} onPreview={onPreview} />
      </div>
    </Card>
  );
}
