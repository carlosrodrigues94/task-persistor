import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { cardsListState } from "@/state/cards/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { ref, set } from "firebase/database";
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

    // const refIds = ref(database, `user-cards-ids/${user.id}`);
    const refIncomes = ref(database, `incomes/${id}`);
    // const ids = await get(refIds);

    // let previousIds = [];

    // if (ids.exists()) {
    //   previousIds = ids.val();
    // }

    // await set(refIds, [...new Set([...previousIds, id])]);

    await set(refIncomes, { id, ...data, createdAt: new Date() });

    refresh();

    setLoading(false);
  };
  return { handleCreateIncome };
};
