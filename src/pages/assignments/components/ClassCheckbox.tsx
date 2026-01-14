import { cn } from "../../../shared/utils/cn";

type Props = {
  checked: boolean;
  label: string;
  onChange: (next: boolean) => void;
  theme: "light" | "dark";
};

export function ClassCheckbox({ checked, label, onChange, theme }: Props) {
  const accent =
    theme === "dark"
      ? "accent-violet-500"
      : "accent-orange-500";

  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-[rgb(var(--text))]">
      <input
        type="checkbox"
        className={cn("h-3.5 w-3.5", accent)}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
