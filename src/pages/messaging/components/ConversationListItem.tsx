/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "../../../shared/utils/cn";
import type { Conversation } from "../messaging.types";
import { formatListTime } from "../utils/format";

type Props = {
  convo: Conversation;
  active?: boolean;
  onClick: () => void;
};

function hashToUint32(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getRandomAvatarUrl(convo: Conversation) {
  // Stable “random” image per conversation/person
  const seed = `${convo.id}-${convo.participant.name}`;
  const idx = (hashToUint32(seed) % 70) + 1; // pravatar has many indexed images
  return `https://i.pravatar.cc/150?img=${idx}`;
}

export function ConversationListItem({ convo, active, onClick }: Props) {
  const [imgOk, setImgOk] = React.useState(true);

  // If later your API provides a real avatarUrl, it will automatically take priority
  const explicitUrl = (convo.participant as any)?.avatarUrl as string | undefined;
  const avatarUrl = explicitUrl || getRandomAvatarUrl(convo);

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
        <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full bg-[rgb(var(--surface-2))] ring-1 ring-[rgb(var(--border))]">
          {imgOk ? (
            <img
              src={avatarUrl}
              alt={convo.participant.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-sm font-semibold text-[rgb(var(--muted))]">
              {convo.participant.name?.slice(0, 1)?.toUpperCase() || "?"}
            </div>
          )}
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
