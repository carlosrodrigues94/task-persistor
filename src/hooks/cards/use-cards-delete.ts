import { database } from "@/services/firebase";
import { cardsListState } from "@/state/cards/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { ref, remove } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
} from "recoil";

export const useCardsDelete = () => {
  const refresh = useRecoilRefresher(cardsListState);
  const [, setLoading] = useRecoilState(loadingState);

  const handleDeleteCard = async (cardId: string) => {
    setLoading(true);

    const refCards = ref(database, `cards/${cardId}`);

    await remove(refCards);

    refresh();

    setLoading(false);
  };

  return { handleDeleteCard };
};
