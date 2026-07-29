import { ICard } from "@/types/card";
import { CardSortOrder } from "@/types/dashboard-preferences";
import { parseCreatedAt } from "@/utils/format-date";

export function compareCardsByCreatedAt(
  a: ICard,
  b: ICard,
  sortOrder: CardSortOrder
): number {
  const dateA = parseCreatedAt(a.createdAt);
  const dateB = parseCreatedAt(b.createdAt);
  const diff = sortOrder === "asc" ? dateA - dateB : dateB - dateA;

  if (diff !== 0) return diff;

  return sortOrder === "asc"
    ? a.id.localeCompare(b.id)
    : b.id.localeCompare(a.id);
}

export function sortCardsByCreatedAt(
  cardsList: ICard[],
  sortOrder: CardSortOrder
): ICard[] {
  return [...cardsList].sort((a, b) => compareCardsByCreatedAt(a, b, sortOrder));
}
