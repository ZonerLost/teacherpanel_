export type ConversationStatus = "active" | "archived";

export type Participant = {
  id: string;
  name: string;
  subtitle?: string; // e.g. Parent of Ethan Chen
  avatarUrl?: string;
};

export type MessageDirection = "outgoing" | "incoming";

export type ChatMessage = {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  text: string;
  createdAt: string; // ISO
};

export type Conversation = {
  id: string;
  participant: Participant;
  lastMessageText: string;
  lastMessageAt: string; // ISO
  unreadCount: number;
  status: ConversationStatus;
};
