import type { ChallengeStatus } from "../challenges.types";

export function formatDueDate(due: string) {
  // Keep as Figma style "Due: 2024-05-31" (simple + clean)
  return `Due: ${due}`;
}

export function statusLabel(s: ChallengeStatus) {
  if (s === "active") return "Active";
  if (s === "upcoming") return "Upcoming";
  return "Completed";
}
