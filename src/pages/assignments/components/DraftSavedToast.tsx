import { CheckCircle } from "lucide-react";
import { cn } from "../../../shared/utils/cn";

type Props = {
  show: boolean;
  theme: "light" | "dark";
};

export function DraftSavedToast({ show, theme }: Props) {
  if (!show) return null;

  const tone =
    theme === "dark"
      ? "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))] text-[rgb(var(--text))]"
      : "bg-white border-[rgb(var(--border))] text-[rgb(var(--text))]";

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center px-4">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-[var(--shadow-soft)]",
          tone
        )}
      >
        <CheckCircle className="h-5 w-5 text-lime-500" />
        <div className="text-sm font-semibold">Draft saved</div>
        <div className="text-xs text-[rgb(var(--muted))]">Your progress was saved successfully.</div>
      </div>
    </div>
  );
}
