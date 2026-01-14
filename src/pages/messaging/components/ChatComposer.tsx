import React from "react";
import { Paperclip, Send } from "lucide-react";
import { cn } from "../../../shared/utils/cn";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onAttach: () => void;
  theme: "light" | "dark";
};

export function ChatComposer({ value, onChange, onSend, onAttach, theme }: Props) {
  const sendCls =
    theme === "dark"
      ? "bg-violet-600 hover:bg-violet-700"
      : "bg-orange-500 hover:bg-orange-600";

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-[rgb(var(--border))] px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onAttach}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgb(var(--surface-2))] hover:opacity-90"
          aria-label="Attach"
        >
          <Paperclip className="h-4 w-4 text-[rgb(var(--muted))]" />
        </button>

        <div className="flex-1 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-4 py-3">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message here..."
            className="w-full bg-transparent text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onSend}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-2xl text-white transition",
            sendCls
          )}
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
