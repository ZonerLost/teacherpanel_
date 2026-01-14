import React from "react";
import { cn } from "../../../shared/utils/cn";
import type { ChatMessage } from "../messaging.types";
import { formatTime } from "../utils/format";

type Props = {
  messages: ChatMessage[];
  theme: "light" | "dark";
};

export function ChatMessages({ messages, theme }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const outgoingCls =
    theme === "dark"
      ? "bg-violet-700/70 text-white"
      : "bg-orange-500 text-white";

  const incomingCls =
    theme === "dark"
      ? "bg-white/10 text-white/90"
      : "bg-slate-600/70 text-white";

  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-4 py-4">
      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-end gap-2",
              m.direction === "outgoing" ? "justify-start" : "justify-start"
            )}
          >
            {/* incoming avatar left */}
            {m.direction === "incoming" ? (
              <div className="h-8 w-8 rounded-full bg-[rgb(var(--surface-2))]" />
            ) : (
              <div className="h-8 w-8" />
            )}

            <div
              className={cn(
                "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                m.direction === "outgoing" ? outgoingCls : incomingCls
              )}
            >
              <div>{m.text}</div>
              <div className="mt-1 text-right text-[10px] opacity-70">
                {formatTime(m.createdAt)}
              </div>
            </div>

            {/* outgoing tiny avatar right in your dark screenshot */}
            {m.direction === "outgoing" ? (
              <div className="h-7 w-7 rounded-full bg-[rgb(var(--surface-2))]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
