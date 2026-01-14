// import * as React from "react";
// import { cn } from "../../utils/cn";

// type ToggleSwitchProps = {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
// };

// export function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
//   const handleToggle = React.useCallback(() => {
//     if (disabled) return;
//     onChange(!checked);
//   }, [checked, disabled, onChange]);

//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       disabled={disabled}
//       onClick={handleToggle}
//       className={cn(
//         "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border",
//         "transition-colors duration-200",
//         "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]/30 focus-visible:ring-offset-2",
//         // OFF
//         "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))]",
//         // ON (Light = green via --primary, Dark = coral via --chart)
//         checked &&
//           "bg-[rgb(var(--primary))] border-slate-950/90 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.55)]",
//         checked &&
//           "dark:bg-[rgb(var(--chart))] dark:border-black/90 dark:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.70)]",
//         disabled && "cursor-not-allowed opacity-60"
//       )}
//     >
//       <span
//         aria-hidden
//         className={cn(
//           "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow",
//           "border border-slate-950/90",
//           "transition-transform duration-200",
//           checked ? "translate-x-[1.35rem]" : "translate-x-0.5"
//         )}
//       />
//     </button>
//   );
// }


import * as React from "react";
import { cn } from "../../utils/cn";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  const toggle = React.useCallback(() => {
    if (disabled) return;
    onChange(!checked);
  }, [checked, disabled, onChange]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border",
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        // OFF state (uses your theme surfaces)
        "bg-[rgb(var(--surface-2))] border-[rgb(var(--border))]",
        // ON state (LIGHT = green, DARK = coral/red)
        checked && "bg-lime-400 border-black/90",
        checked && "dark:bg-rose-400 dark:border-black/90",
        // focus ring should follow theme too
        "focus-visible:ring-lime-400/35 dark:focus-visible:ring-rose-400/35",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white",
          "border border-black/90 shadow",
          "transition-transform duration-200",
          checked ? "translate-x-[1.35rem]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
