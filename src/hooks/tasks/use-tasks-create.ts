import { ICard } from "@/types/card";
import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { cardsListState } from "@/state/cards/list/atoms";
import { ITask } from "@/types/task";
import { v4 as uuid } from "uuid";
import { ref, update } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const useTasksCreate = () => {
  const [user] = useRecoilState(authState);
  const cards = useRecoilValue(cardsListState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleCreateTask = async (data: {
    cardId: string;
    task: Omit<ITask, "cardId" | "id">;
  }) => {
    const card = cards.find((item) => item.id === data.cardId);

    if (!card) return;

    const newTask: ITask = {
      id: uuid(),
      cardId: card.id,
      ...data.task,
    };

    const updates: Record<string, ICard> = {
      [`cards/${data.cardId}`]: { ...card, tasks: [...card.tasks, newTask] },
    };

    await update(ref(database), updates);

    refresh();

    return;
  };

  return {
    handleCreateTask,
  };
};
