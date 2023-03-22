import { database } from "@/services/firebase";
import { cardsListState } from "@/state/cards/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { IIncome } from "@/types/income";
import { get, ref, remove } from "firebase/database";
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

    const refIncomes = await get(ref(database, "incomes"));
    const incomes = (await refIncomes.val()) as Record<string, IIncome>;

    let incomesToDelete: IIncome[] = [];

    if (incomes) {
      Object.entries(incomes).forEach(([id, value]) => {
        const income = value as IIncome;
        if (income.cardId === cardId) {
          incomesToDelete.push(income);
        }
      });
    }

    for await (const income of incomesToDelete) {
      const refIncome = ref(database, `incomes/${income.id}`);
      await remove(refIncome);
    }
    incomesToDelete = [];

    await remove(refCards);

    refresh();

    setLoading(false);
  };

  return { handleDeleteCard };
};
