import { FileText, FileDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, FormField, Select, Input, Button } from "../../../shared/ui";
import type { ReportFilters } from "../reports.types";
import { cn } from "../../../shared/utils/cn";

type Props = {
  variant: "surface" | "glass";
  filters: ReportFilters;
  onChange: (patch: Partial<ReportFilters>) => void;

  classOptions: readonly string[];
  studentOptions: readonly string[];
  assignmentOptions: readonly string[];
  reportTypeOptions: readonly string[];

  onGeneratePdf: () => void;
  onExportCsv: () => void;

  theme: "light" | "dark";
};

export function ReportsFilterCard({
  variant,
  filters,
  onChange,
  classOptions,
  studentOptions,
  assignmentOptions,
  reportTypeOptions,
  onGeneratePdf,
  onExportCsv,
  theme,
}: Props) {
  const leftBtnClass =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-purple-700 text-white hover:bg-purple-800";

  const rightBtnClass =
    theme === "dark"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "bg-orange-500 text-white hover:bg-orange-600";

  return (
    <Card variant={variant} className="p-5">
      <CardHeader>
        <CardTitle>Filter Reports</CardTitle>
        <CardDescription>Select criteria to generate specific reports.</CardDescription>
      </CardHeader>

      <div className="mt-4 space-y-4">
        <FormField label="Class">
          <Select value={filters.className} onChange={(e) => onChange({ className: e.target.value })}>
            {classOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Student (Optional)">
          <Select value={filters.student} onChange={(e) => onChange({ student: e.target.value })}>
            {studentOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Assignment (Optional)">
          <Select value={filters.assignment} onChange={(e) => onChange({ assignment: e.target.value })}>
            {assignmentOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Report Type">
          <Select value={filters.reportType} onChange={(e) => onChange({ reportType: e.target.value })}>
            {reportTypeOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-[rgb(var(--text))]">Date Range</div>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={filters.dateFrom} onChange={(e) => onChange({ dateFrom: e.target.value })} />
            <Input type="date" value={filters.dateTo} onChange={(e) => onChange({ dateTo: e.target.value })} />
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            variant="ghost"
            className={cn("w-full", leftBtnClass)}
            onClick={onGeneratePdf}
            leftIcon={<FileText className="h-4 w-4" />}
          >
            Generate & Export PDF
          </Button>

          <Button
            variant="ghost"
            className={cn("w-full", rightBtnClass)}
            onClick={onExportCsv}
            leftIcon={<FileDown className="h-4 w-4" />}
          >
            Export CSV
          </Button>
        </div>
      </div>
    </Card>
  );
}
