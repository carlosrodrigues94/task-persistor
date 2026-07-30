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

export function formatDueDate(value: Date | string | undefined): string {
  if (!value) return "Sem prazo";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = DateTime.fromISO(value, { zone: "local" });
    if (!date.isValid) return "Sem prazo";
    return date.setLocale("pt-BR").toFormat("dd MMM yyyy");
  }

  const timestamp = parseCreatedAt(value);
  if (!timestamp) return "Sem prazo";

  const date = DateTime.fromMillis(timestamp);
  if (!date.isValid) return "Sem prazo";

  return date.setLocale("pt-BR").toFormat("dd MMM yyyy");
}

export type DueDateTemperature = "overdue" | "urgent" | "soon" | "safe" | "none";

export type DueDateTemperatureStyle = {
  temperature: DueDateTemperature;
  daysRemaining: number | null;
  color: string;
  background: string;
};

const TEMPERATURE_STYLES: Record<
  Exclude<DueDateTemperature, "none">,
  Omit<DueDateTemperatureStyle, "temperature" | "daysRemaining">
> = {
  overdue: {
    color: "#e74c3c",
    background: "rgba(231, 76, 60, 0.12)",
  },
  urgent: {
    color: "#ff9f43",
    background: "rgba(255, 159, 67, 0.14)",
  },
  soon: {
    color: "#f1c40f",
    background: "rgba(241, 196, 15, 0.16)",
  },
  safe: {
    color: "#2e86de",
    background: "rgba(46, 134, 222, 0.12)",
  },
};

function parseDueDateTime(value: Date | string | undefined): DateTime | null {
  if (!value) return null;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = DateTime.fromISO(value, { zone: "local" }).startOf("day");
    return date.isValid ? date : null;
  }

  const timestamp = parseCreatedAt(value);
  if (!timestamp) return null;

  const date = DateTime.fromMillis(timestamp).startOf("day");
  return date.isValid ? date : null;
}

export function getDaysUntilDue(
  value: Date | string | undefined
): number | null {
  const dueDate = parseDueDateTime(value);
  if (!dueDate) return null;

  const today = DateTime.now().startOf("day");
  return Math.floor(dueDate.diff(today, "days").days);
}

export function getDueDateTemperature(
  value: Date | string | undefined
): DueDateTemperatureStyle {
  const daysRemaining = getDaysUntilDue(value);

  if (daysRemaining === null) {
    return {
      temperature: "none",
      daysRemaining: null,
      color: "rgba(0, 0, 0, 0.45)",
      background: "rgba(0, 0, 0, 0.06)",
    };
  }

  let temperature: Exclude<DueDateTemperature, "none">;

  if (daysRemaining < 0) {
    temperature = "overdue";
  } else if (daysRemaining <= 2) {
    temperature = "urgent";
  } else if (daysRemaining <= 4) {
    temperature = "soon";
  } else {
    temperature = "safe";
  }

  return {
    temperature,
    daysRemaining,
    ...TEMPERATURE_STYLES[temperature],
  };
}
