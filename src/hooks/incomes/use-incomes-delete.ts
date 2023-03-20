import { database } from "@/services/firebase";
import { incomesListState } from "@/state/incomes/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { ref, remove } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
} from "recoil";

export const useIncomesDelete = () => {
  const refresh = useRecoilRefresher(incomesListState);
  const [, setLoading] = useRecoilState(loadingState);

  const handleDeleteIncome = async (incomeId: string) => {
    setLoading(true);

    const refCards = ref(database, `incomes/${incomeId}`);

    await remove(refCards);

    refresh();

    setLoading(false);
  };

  return {
    handleDeleteIncome,
  };
};
