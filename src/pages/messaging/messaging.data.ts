import type { ChatMessage, Conversation } from "./messaging.types";

const now = new Date();
const iso = (d: Date) => d.toISOString();

export const initialConversations: Conversation[] = [
  {
    id: "c1",
    participant: { id: "p1", name: "Sarah Chen", subtitle: "Parent of Ethan Chen", avatarUrl: "" },
    lastMessageText: "Thank you for the update!",
    lastMessageAt: iso(new Date(now.getTime() - 30 * 60 * 1000)),
    unreadCount: 0,
    status: "active",
  },
  {
    id: "c2",
    participant: { id: "p2", name: "David Lee", subtitle: "Parent", avatarUrl: "" },
    lastMessageText: "Ethan loved the new reading activity",
    lastMessageAt: iso(new Date(now.getTime() - 24 * 60 * 60 * 1000)),
    unreadCount: 1,
    status: "active",
  },
  {
    id: "c3",
    participant: { id: "p3", name: "Maria Garcia", subtitle: "Parent", avatarUrl: "" },
    lastMessageText: "I’ll make sure to review the vocabulary.",
    lastMessageAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
    unreadCount: 0,
    status: "active",
  },
  {
    id: "c4",
    participant: { id: "p4", name: "Emily White", subtitle: "Parent", avatarUrl: "" },
    lastMessageText: "Could we schedule a quick call?",
    lastMessageAt: iso(new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)),
    unreadCount: 2,
    status: "active",
  },
  {
    id: "c5",
    participant: { id: "p5", name: "Robert Johnson", subtitle: "Parent", avatarUrl: "" },
    lastMessageText: "Acknowledged. I’ll discuss with him.",
    lastMessageAt: iso(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)),
    unreadCount: 0,
    status: "active",
  },
  {
    id: "c6",
    participant: { id: "p6", name: "Jessica Davis", subtitle: "Parent", avatarUrl: "" },
    lastMessageText: "I've noticed significant improvement!",
    lastMessageAt: iso(new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000)),
    unreadCount: 0,
    status: "archived",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "c1",
    direction: "outgoing",
    text: "Hi Sarah, just wanted to share Ethan’s progress this week. He’s doing really well with the new vocabulary words!",
    createdAt: iso(new Date(now.getTime() - 35 * 60 * 1000)),
  },
  {
    id: "m2",
    conversationId: "c1",
    direction: "incoming",
    text: "That’s wonderful to hear! Thank you for the update!",
    createdAt: iso(new Date(now.getTime() - 30 * 60 * 1000)),
  },
];
