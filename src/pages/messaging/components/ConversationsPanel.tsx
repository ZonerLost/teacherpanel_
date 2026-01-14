import React from "react";
import { MessageSquare, Search } from "lucide-react";
import { Card } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { Conversation } from "../messaging.types";
import { ConversationListItem } from "./ConversationListItem";

type Tab = "all" | "unread" | "archived";

type Props = {
  variant: "surface" | "glass";
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onChangeTab: (tab: Tab) => void;
  tab: Tab;
  search: string;
  onSearch: (value: string) => void;
};

export function ConversationsPanel({
  variant,
  conversations,
  activeId,
  onSelect,
  tab,
  onChangeTab,
  search,
  onSearch,
}: Props) {
  return (
    <Card variant={variant} className="p-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-[rgb(var(--muted))]" />
        <div className="text-base font-bold text-[rgb(var(--text))]">Conversations</div>
      </div>

      {/* search */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-3 py-2">
        <Search className="h-4 w-4 text-[rgb(var(--muted))]" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search conversations..."
          className="w-full bg-transparent text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none"
        />
      </div>

      {/* tabs */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[rgb(var(--surface-2))] p-1">
        <TabBtn active={tab === "all"} onClick={() => onChangeTab("all")}>
          All
        </TabBtn>
        <TabBtn active={tab === "unread"} onClick={() => onChangeTab("unread")}>
          Unread
        </TabBtn>
        <TabBtn active={tab === "archived"} onClick={() => onChangeTab("archived")}>
          Archived
        </TabBtn>
      </div>

      <div className="mt-3 space-y-2">
        {conversations.length === 0 ? (
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-4 text-sm text-[rgb(var(--muted))]">
            No conversations found.
          </div>
        ) : (
          conversations.map((c) => (
            <ConversationListItem
              key={c.id}
              convo={c}
              active={activeId === c.id}
              onClick={() => onSelect(c.id)}
            />
          ))
        )}
      </div>
    </Card>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-2xl px-3 py-2 text-xs font-semibold transition",
        active
          ? "bg-violet-600 text-white"
          : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
      )}
    >
      {children}
    </button>
  );
}
