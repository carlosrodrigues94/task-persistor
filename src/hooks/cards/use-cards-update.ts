import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { cardsListState } from "@/state/cards/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { ColorKey } from "@/styles/colors";
import { ICard } from "@/types/card";
import { ref, update } from "firebase/database";
import { useCallback } from "react";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const useCardsUpdate = () => {
  const [user] = useRecoilState(authState);
  const [, setLoading] = useRecoilState(loadingState);
  const cards = useRecoilValue(cardsListState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleSetCardColor = async (data: {
    cardId: string;
    color: string;
  }) => {
    setLoading(true);
    const card = cards.find((item) => item.id === data.cardId);

    if (!card) return;

    if (card.color === data.color) return;

    const updates: Record<string, ICard> = {
      [`cards/${data.cardId}`]: { ...card, color: data.color },
    };

    await update(ref(database), updates);

    refresh();

    setLoading(false);

    return;
  };

  return {
    handleSetCardColor,
  };
};
