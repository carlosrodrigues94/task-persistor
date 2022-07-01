import { ICard } from "@/types/card";
import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { cardsListState } from "@/state/cards/list/atoms";
import { ref, update } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const useTasksDelete = () => {
  const [user] = useRecoilState(authState);
  const cards = useRecoilValue(cardsListState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleDeleteTask = async (data: { taskId: string; cardId: string }) => {
    const card = cards.find((item) => item.id === data.cardId);

    if (!card) return;

    const updates: Record<string, ICard> = {
      [`cards/${data.cardId}`]: {
        ...card,
        tasks: card.tasks.filter((task) => task.id !== data.taskId),
      },
    };

    await update(ref(database), updates);

    refresh();

    return;
  };

  return {
    handleDeleteTask,
  };
};
