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
import { ITask } from "@/types/task";

export const useTasksUpdate = () => {
  const [user] = useRecoilState(authState);
  const cards = useRecoilValue(cardsListState);
  const refresh = useRecoilRefresher(cardsListState);

  const handleChangeTaskCheck = async (data: {
    taskId: string;
    isChecked: boolean;
    cardId: string;
  }) => {
    const card = cards.find((item) => item.id === data.cardId);

    if (!card) return;

    const filtered = card.tasks.filter((task) => task.id !== data.taskId);
    const task = card.tasks.find((task) => task.id === data.taskId);

    if (!task) return;

    const updated: ITask = { ...task, isCompleted: data.isChecked };

    const updates: Record<string, ICard> = {
      [`cards/${data.cardId}`]: {
        ...card,
        tasks: [...filtered, updated],
      },
    };

    await update(ref(database), updates);

    refresh();

    return;
  };

  return {
    handleChangeTaskCheck,
  };
};
