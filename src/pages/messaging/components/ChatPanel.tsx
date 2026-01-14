import { ArrowLeft, Info } from "lucide-react";
import { Card } from "../../../shared/ui";
import type { ChatMessage, Conversation } from "../messaging.types";
import { ChatMessages } from "./ChatMessages";
import { ChatComposer } from "./ChatComposer";

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

          <div className="h-10 w-10 rounded-full bg-[rgb(var(--surface-2))]" />

          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-[rgb(var(--text))]">
              {activeConversation?.participant.name ?? "Select a conversation"}
            </div>
            <div className="truncate text-xs text-[rgb(var(--muted))]">
              {activeConversation?.participant.subtitle ?? " "}
            </div>
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
