import { DateTime } from "luxon";

export function parseCreatedAt(value: unknown): number {
  if (value == null || value === "") return 0;

  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isFinite(time) ? time : 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && value.trim() !== "") {
      return numericValue;
    }

    const parsedDate = new Date(value).getTime();
    if (Number.isFinite(parsedDate)) return parsedDate;

    const luxonDate = DateTime.fromISO(value);
    if (luxonDate.isValid) return luxonDate.toMillis();
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.seconds === "number") {
      return record.seconds * 1000;
    }
  }

  return 0;
}

export function formatCreatedAt(value: Date | string | undefined): string {
  const timestamp = parseCreatedAt(value);
  if (!timestamp) return "";

  const date = DateTime.fromMillis(timestamp);

  if (!date.isValid) return "";

  return date.setLocale("pt-BR").toFormat("dd MMM yyyy, HH:mm");
}
