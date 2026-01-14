import type { AssignmentItemType } from "../assignments.types";

export function itemTypeLabel(type: AssignmentItemType) {
  return type === "book" ? "Book" : "Activity";
}
