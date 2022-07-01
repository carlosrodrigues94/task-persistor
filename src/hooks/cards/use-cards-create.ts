import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { cardsListState } from "@/state/cards/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { get, ref, set } from "firebase/database";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import { useRecoilRefresher_UNSTABLE as useRecoilRefresher } from "recoil";
import { ICard } from "@/types/card";

export type CreateCardProps = Omit<ICard, "id" | "createdAt">;

export const useCardsCreate = () => {
  const [user] = useRecoilState(authState);
  const [, setLoading] = useRecoilState(loadingState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleCreateCard = async (data: CreateCardProps) => {
    setLoading(true);
    const id = uuid();

    const refIds = ref(database, `user-cards-ids/${user.id}`);
    const refCards = ref(database, `cards/${id}`);
    const ids = await get(refIds);

    let previousIds = [];

    if (ids.exists()) {
      previousIds = ids.val();
    }

    await set(refIds, [...new Set([...previousIds, id])]);

    await set(refCards, { id, ...data, createdAt: new Date() });

    refresh();

    setLoading(false);
  };
  return { handleCreateCard };
};
