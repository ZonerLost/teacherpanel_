import { FileText, FileDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  FormField,
  Select,
  Input,
  Button,
} from "../../../shared/ui";
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
  // Solid colors that match your screenshots (purple + orange)
  const leftBg = theme === "dark" ? "#7C3AED" : "#6D28D9"; // violet-600 / violet-700
  const rightBg = "#F97316"; // orange-500 (both themes)

  const leftRing =
    theme === "dark"
      ? "focus-visible:ring-violet-500/30"
      : "focus-visible:ring-violet-600/25";

  const rightRing =
    theme === "dark"
      ? "focus-visible:ring-orange-500/30"
      : "focus-visible:ring-orange-500/25";

  const btnBase = (ringCls: string) =>
    cn(
      "w-full h-11 rounded-2xl px-4",
      "font-semibold",
      "!text-white",
      "shadow-sm",
      "hover:brightness-95 active:brightness-90",
      "focus-visible:outline-none focus-visible:ring-4",
      ringCls,
      "disabled:cursor-not-allowed disabled:opacity-60"
    );

  return (
    <Card variant={variant} className="p-5">
      <CardHeader>
        <CardTitle>Filter Reports</CardTitle>
        <CardDescription>Select criteria to generate specific reports.</CardDescription>
      </CardHeader>

      <div className="mt-4 space-y-4">
        <FormField label="Class">
          <Select
            value={filters.className}
            onChange={(e) => onChange({ className: e.target.value })}
          >
            {classOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Student (Optional)">
          <Select
            value={filters.student}
            onChange={(e) => onChange({ student: e.target.value })}
          >
            {studentOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Assignment (Optional)">
          <Select
            value={filters.assignment}
            onChange={(e) => onChange({ assignment: e.target.value })}
          >
            {assignmentOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Report Type">
          <Select
            value={filters.reportType}
            onChange={(e) => onChange({ reportType: e.target.value })}
          >
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
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onChange({ dateFrom: e.target.value })}
            />
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onChange({ dateTo: e.target.value })}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            variant="ghost"
            className={btnBase(leftRing)}
            style={{ backgroundColor: leftBg }}
            onClick={onGeneratePdf}
            leftIcon={<FileText className="h-4 w-4" />}
          >
            Generate & Export PDF
          </Button>

          <Button
            variant="ghost"
            className={btnBase(rightRing)}
            style={{ backgroundColor: rightBg }}
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
