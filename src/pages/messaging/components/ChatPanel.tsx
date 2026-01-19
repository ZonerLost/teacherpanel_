import React from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Card } from "../../../shared/ui";
import type { ChatMessage, Conversation } from "../messaging.types";
import { ChatMessages } from "./ChatMessages";
import { ChatComposer } from "./ChatComposer";
import { cn } from "../../../shared/utils/cn";

type Props = {
  variant: "surface" | "glass";
  theme: "light" | "dark";

  activeConversation: Conversation | null;
  messages: ChatMessage[];

  composerText: string;
  onComposerText: (v: string) => void;
  onSend: () => void;
  onAttach: () => void;
  onOpenInfo: () => void;

  showBack?: boolean;
  onBack?: () => void;
};

function Avatar({
  name,
  url,
  sizeClass = "h-10 w-10",
}: {
  name: string;
  url?: string | null;
  sizeClass?: string;
}) {
  const [ok, setOk] = React.useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-[rgb(var(--surface-2))] ring-1 ring-[rgb(var(--border))]",
        sizeClass
      )}
    >
      {url && ok ? (
        <img
          src={url}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm font-semibold text-[rgb(var(--muted))]">
          {name?.slice(0, 1)?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}

export function ChatPanel({
  variant,
  theme,
  activeConversation,
  messages,
  composerText,
  onComposerText,
  onSend,
  onAttach,
  onOpenInfo,
  showBack,
  onBack,
}: Props) {
  const name = activeConversation?.participant.name ?? "Select a conversation";
  const subtitle = activeConversation?.participant.subtitle ?? " ";
  const avatarUrl = activeConversation?.participant.avatarUrl || undefined;

  return (
    <Card variant={variant} className="flex h-[680px] flex-col overflow-hidden p-0">
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--border))] px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[rgb(var(--surface-2))]"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : null}

          {/* avatar */}
          <Avatar name={name} url={avatarUrl} />

          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-[rgb(var(--text))]">{name}</div>
            <div className="truncate text-xs text-[rgb(var(--muted))]">{subtitle}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenInfo}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[rgb(var(--surface-2))]"
          aria-label="Info"
          disabled={!activeConversation}
        >
          <Info className="h-4 w-4 text-[rgb(var(--muted))]" />
        </button>
      </div>

      {/* body */}
      {activeConversation ? (
        <>
          <ChatMessages messages={messages} theme={theme} />
          <ChatComposer
            value={composerText}
            onChange={onComposerText}
            onSend={onSend}
            onAttach={onAttach}
            theme={theme}
          />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center px-6 text-sm text-[rgb(var(--muted))]">
          Choose a conversation from the left to start messaging.
        </div>
      )}
    </Card>
  );
}
