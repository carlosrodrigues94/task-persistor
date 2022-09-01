import { cardsListState } from "@/state/cards/list/atoms";
import { useCallback } from "react";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilValue,
} from "recoil";

export const useCardsList = () => {
  const cards = useRecoilValue(cardsListState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleRefreshCardsList = useCallback(() => {
    refresh();
  }, [refresh]);

  // useEffect(() => {
  //   refresh();
  // }, [refresh]);

  return {
    handleRefreshCardsList,
    cards,
  };
};
