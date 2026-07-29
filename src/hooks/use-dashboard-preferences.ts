import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import {
  CardFilter,
  CardSortOrder,
  DashboardPreferences,
  DEFAULT_DASHBOARD_PREFERENCES,
} from "@/types/dashboard-preferences";
import { get, ref, set } from "firebase/database";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import useStateStorage from "./use-state-storage";

const STORAGE_KEY = "@task-persistor:dashboard-preferences";

function getPreferencesPath(userId: string) {
  return `user-preferences/${userId}`;
}

function normalizePreferences(
  value: Partial<DashboardPreferences> | null | undefined
): DashboardPreferences {
  const cardSortOrder =
    value?.cardSortOrder === "desc" ? "desc" : DEFAULT_DASHBOARD_PREFERENCES.cardSortOrder;
  const cardFilter =
    value?.cardFilter === "calculator" || value?.cardFilter === "regular"
      ? value.cardFilter
      : DEFAULT_DASHBOARD_PREFERENCES.cardFilter;

  return { cardSortOrder, cardFilter };
}

export const useDashboardPreferences = () => {
  const { id: userId } = useRecoilValue(authState);
  const [preferences, setPreferences] = useStateStorage<DashboardPreferences>(
    DEFAULT_DASHBOARD_PREFERENCES,
    STORAGE_KEY
  );
  const preferencesRef = useRef(preferences);
  const hasUserChanged = useRef(false);

  preferencesRef.current = preferences;

  useEffect(() => {
    if (!userId) {
      hasUserChanged.current = false;
      return;
    }

    let isActive = true;

    const loadPreferences = async () => {
      try {
        const snapshot = await get(ref(database, getPreferencesPath(userId)));

        if (!isActive || !snapshot.exists() || hasUserChanged.current) {
          return;
        }

        const data = snapshot.val() as Partial<DashboardPreferences>;

        setPreferences(normalizePreferences(data));
      } catch {
        // Keep local preferences when Firebase is unavailable.
      }
    };

    loadPreferences();

    return () => {
      isActive = false;
    };
  }, [userId, setPreferences]);

  const persistPreferences = useCallback(
    async (nextPreferences: DashboardPreferences) => {
      if (!userId) return;

      await set(ref(database, getPreferencesPath(userId)), nextPreferences);
    },
    [userId]
  );

  const updatePreferences = useCallback(
    (nextPreferences: DashboardPreferences) => {
      hasUserChanged.current = true;
      setPreferences(nextPreferences);
      void persistPreferences(nextPreferences);
    },
    [persistPreferences, setPreferences]
  );

  const setCardSortOrder = useCallback(
    (cardSortOrder: CardSortOrder) => {
      updatePreferences({
        ...preferencesRef.current,
        cardSortOrder,
      });
    },
    [updatePreferences]
  );

  const toggleCardSortOrder = useCallback(() => {
    const current = preferencesRef.current;

    updatePreferences({
      ...current,
      cardSortOrder: current.cardSortOrder === "asc" ? "desc" : "asc",
    });
  }, [updatePreferences]);

  const setCardFilter = useCallback(
    (cardFilter: CardFilter) => {
      updatePreferences({
        ...preferencesRef.current,
        cardFilter,
      });
    },
    [updatePreferences]
  );

  return {
    preferences,
    setCardSortOrder,
    toggleCardSortOrder,
    setCardFilter,
  };
};
