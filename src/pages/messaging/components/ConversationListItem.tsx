import { cn } from "../../../shared/utils/cn";
import type { Conversation } from "../messaging.types";
import { formatListTime } from "../utils/format";

type Props = {
  convo: Conversation;
  active?: boolean;
  onClick: () => void;
};

export function ConversationListItem({ convo, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl px-3 py-3 text-left transition",
        active ? "bg-[rgb(var(--surface-2))]" : "hover:bg-[rgb(var(--surface-2))]/70"
      )}
    >
      <div className="flex items-center gap-3">
        {/* avatar */}
        <div className="h-10 w-10 flex-none overflow-hidden rounded-full bg-[rgb(var(--surface-2))]">
          {/* Replace with real image later */}
          <div className="h-full w-full" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-sm font-semibold text-[rgb(var(--text))]">
              {convo.participant.name}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[rgb(var(--muted))]">
                {formatListTime(convo.lastMessageAt)}
              </span>
              {convo.unreadCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white">
                  {convo.unreadCount}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-0.5 truncate text-xs text-[rgb(var(--muted))]">
            {convo.lastMessageText}
          </div>
        </div>
      </div>
    </button>
  );
}
