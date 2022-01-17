type Key =
  | "blue"
  | "purple"
  | "red"
  | "orange"
  | "cyan"
  | "green"
  | "yellow"
  | "pink"
  | string;

export const colors: Record<Key, string> = {
  blue: "#2e86de",
  purple: "#8e44ad",
  red: "#ff6b6b",
  orange: "#ff9f43",
  cyan: "#0abde3",
  green: "#1dd1a1",
  yellow: "#f9ca24",
  pink: "#ff9ff3",
};
