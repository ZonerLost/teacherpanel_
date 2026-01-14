import React from "react";
import { cn } from "../../utils/cn";

type SliderProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelLeft?: string;
  labelRight?: string;
};

export function Slider({ className, labelLeft, labelRight, ...props }: SliderProps) {
  return (
    <div className="space-y-2">
      <input
        type="range"
        className={cn("w-full accent-[rgb(var(--accent))]", className)}
        {...props}
      />
      {(labelLeft || labelRight) && (
        <div className="flex items-center justify-between text-xs text-[rgb(var(--muted))]">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
    </div>
  );
}
