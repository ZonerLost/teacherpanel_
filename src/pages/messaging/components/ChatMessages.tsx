import React from "react";
import { cn } from "../../../shared/utils/cn";
import type { ChatMessage } from "../messaging.types";
import { formatTime } from "../utils/format";

type Props = {
  messages: ChatMessage[];
  theme: "light" | "dark";
};

function hashToUint32(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function avatarFromSeed(seed: string) {
  const idx = (hashToUint32(seed) % 70) + 1;
  return `https://i.pravatar.cc/100?img=${idx}`;
}

function Avatar({
  seed,
  sizeClass,
  alt,
}: {
  seed: string;
  sizeClass: string;
  alt: string;
}) {
  const [ok, setOk] = React.useState(true);
  const url = React.useMemo(() => avatarFromSeed(seed), [seed]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-[rgb(var(--surface-2))] ring-1 ring-[rgb(var(--border))]",
        sizeClass
      )}
    >
      {ok ? (
        <img
          src={url}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-xs font-semibold text-[rgb(var(--muted))]">
          {alt?.slice(0, 1)?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}

export function ChatMessages({ messages, theme }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const outgoingCls =
    theme === "dark" ? "bg-violet-700/70 text-white" : "bg-orange-500 text-white";

  const incomingCls =
    theme === "dark" ? "bg-white/10 text-white/90" : "bg-slate-600/70 text-white";

  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-4 py-4">
      <div className="space-y-3">
        {messages.map((m) => {
          const convoSeed = m.conversationId || "unknown";
          const incomingSeed = `incoming-${convoSeed}`;
          const outgoingSeed = `me-${convoSeed}`;

          return (
            <div
              key={m.id}
              className={cn(
                "flex items-end gap-2",
                // keep your current alignment; change to justify-end for outgoing if you want
                "justify-start"
              )}
            >
              {/* incoming avatar left */}
              {m.direction === "incoming" ? (
                <Avatar seed={incomingSeed} sizeClass="h-8 w-8" alt="U" />
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

              {/* outgoing tiny avatar right */}
              {m.direction === "outgoing" ? (
                <Avatar seed={outgoingSeed} sizeClass="h-7 w-7" alt="Me" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
