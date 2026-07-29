export type CardSortOrder = "asc" | "desc";

export type CardFilter = "all" | "calculator" | "regular";

export type DashboardPreferences = {
  cardSortOrder: CardSortOrder;
  cardFilter: CardFilter;
};

export const DEFAULT_DASHBOARD_PREFERENCES: DashboardPreferences = {
  cardSortOrder: "asc",
  cardFilter: "all",
};
