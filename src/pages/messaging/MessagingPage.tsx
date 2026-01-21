import React from "react";
import { useResolvedTheme } from "../dashboard/hooks/useResolvedTheme";
import { cn } from "../../shared/utils/cn";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
import type { ChatMessage, Conversation } from "./messaging.types";
import { initialConversations, initialMessages } from "./messaging.data";

import { ConversationsPanel } from "./components/ConversationsPanel";
import { ChatPanel } from "./components/ChatPanel";
import { ContactInfoModal } from "./components/modals/ContactInfoModal";
import { AttachFileModal } from "./components/modals/AttachFileModal";

type Tab = "all" | "unread" | "archived";

function makeId(prefix = "id") {
  return `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

export default function MessagingPage() {
  const theme = useResolvedTheme();
  const variant = theme === "dark" ? "glass" : "surface";

  const [tab, setTab] = React.useState<Tab>("all");
  const [search, setSearch] = React.useState("");

  const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);

  const [activeId, setActiveId] = React.useState<string | null>("c1");

  // responsive view (mobile)
  const [mobileView, setMobileView] = React.useState<"list" | "chat">("list");

  // modals
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [attachOpen, setAttachOpen] = React.useState(false);

  const activeConversation = React.useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  );

  const activeMessages = React.useMemo(
    () => messages.filter((m) => m.conversationId === activeId),
    [messages, activeId]
  );

  const filteredConversations = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return conversations
      .filter((c) => {
        if (tab === "archived") return c.status === "archived";
        if (tab === "unread") return c.status === "active" && c.unreadCount > 0;
        return c.status === "active";
      })
      .filter((c) => {
        if (!q) return true;
        const hay = `${c.participant.name} ${c.lastMessageText}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  }, [conversations, tab, search]);

  const selectConversation = (id: string) => {
    setActiveId(id);

    // mark read when opened
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );

    // on mobile: switch to chat view
    setMobileView("chat");
  };

  const [composer, setComposer] = React.useState("");

  const sendMessage = () => {
    if (!activeId || !composer.trim()) return;

    const text = composer.trim();
    const msg: ChatMessage = {
      id: makeId("m"),
      conversationId: activeId,
      direction: "outgoing",
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, msg]);
    setComposer("");

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
            ...c,
            lastMessageText: text,
            lastMessageAt: msg.createdAt,
          }
          : c
      )
    );
  };

  const attachAsText = (text: string) => {
    setComposer((p) => (p ? `${p}\n${text}` : text));
  };

  const toggleArchive = () => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const nextStatus = c.status === "archived" ? "active" : "archived";
        return { ...c, status: nextStatus };
      })
    );
    setInfoOpen(false);
  };

  const markUnread = () => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, unreadCount: Math.max(1, c.unreadCount) } : c))
    );
    setInfoOpen(false);
  };

  // Layout:
  // - mobile: list OR chat
  // - desktop: both
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
        {/* Left panel */}
        <div className={cn("lg:block", mobileView === "chat" ? "hidden" : "block")}>
          <ConversationsPanel
            variant={variant}
            conversations={filteredConversations}
            activeId={activeId}
            onSelect={selectConversation}
            tab={tab}
            onChangeTab={setTab}
            search={search}
            onSearch={setSearch}
          />
        </div>

        {/* Right panel */}
        <div className={cn("lg:block", mobileView === "list" ? "hidden" : "block")}>
          <ChatPanel
            variant={variant}
            theme={theme}
            activeConversation={activeConversation}
            messages={activeMessages}
            composerText={composer}
            onComposerText={setComposer}
            onSend={sendMessage}
            onAttach={() => setAttachOpen(true)}
            onOpenInfo={() => setInfoOpen(true)}
            showBack={true}
            onBack={() => setMobileView("list")}
          />
        </div>
      </div>


      <div className="flex items-center justify-between border-t border-[rgb(var(--border))] pt-3 text-xs text-[rgb(var(--muted))]">
        <ModuleFooter
          theme={theme}
          className="w-full"
          containerClassName="max-w-screen-2xl"
        />
      </div>

      {/* Modals */}
      <ContactInfoModal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        conversation={activeConversation}
        onToggleArchive={toggleArchive}
        onMarkUnread={markUnread}
      />

      <AttachFileModal
        open={attachOpen}
        onClose={() => setAttachOpen(false)}
        onAttachText={attachAsText}
      />
    </div>
  );
}
