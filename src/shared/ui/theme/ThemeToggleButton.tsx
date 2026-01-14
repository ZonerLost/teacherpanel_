import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../theme/useTheme";
import { cn } from "../../utils/cn";

type ThemeToggleButtonProps = {
  className?: string;
};

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--border))]",
        "text-[rgb(var(--text))] transition-colors hover:bg-[rgb(var(--surface-2))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]/40",
        className
      )}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
