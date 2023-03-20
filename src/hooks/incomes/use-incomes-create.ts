import { database } from "@/services/firebase";
import { loadingState } from "@/state/loading/atoms";
import { get, ref, set } from "firebase/database";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import { useRecoilRefresher_UNSTABLE as useRecoilRefresher } from "recoil";
import { IIncome } from "@/types/income";
import { incomesListState } from "@/state/incomes/list/atoms";

export const useIncomesCreate = () => {
  const [, setLoading] = useRecoilState(loadingState);
  const refresh = useRecoilRefresher(incomesListState);

  const handleCreateIncome = async (data: Omit<IIncome, "id">) => {
    setLoading(true);

    const id = uuid();
    const refIncomes = ref(database, `incomes/${id}`);
    const incomesData = await get(ref(database, `incomes`));

    if (!incomesData.val()) {
      await set(refIncomes, { id, ...data, createdAt: new Date() });
      refresh();
      setLoading(false);
      return;
    }

    const incomes = Object.entries(incomesData.val()).map(([, value]) => {
      return value;
    }) as IIncome[];

    const incomeForThisCard = incomes.find(
      (item) => item.cardId === data.cardId
    );

    if (!incomeForThisCard) {
      await set(refIncomes, { id, ...data, createdAt: new Date() });
      refresh();
      setLoading(false);
      return;
    }

    const refIncome = ref(database, `incomes/${incomeForThisCard.id}`);
    await set(refIncome, { id, ...data, createdAt: new Date() });
    refresh();
    setLoading(false);
  };
  return { handleCreateIncome };
};
