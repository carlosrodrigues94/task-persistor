import { database } from "@/services/firebase";
import { installmentsListState } from "@/state/installments/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { IIncome } from "@/types/income";
import { get, ref, remove } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
} from "recoil";

export const useInstallmentsDelete = () => {
  const refresh = useRecoilRefresher(installmentsListState);
  const [, setLoading] = useRecoilState(loadingState);

  const handleDeleteInstallment = async (installmentId: string) => {
    setLoading(true);

    const refInstallments = ref(database, `installments/${installmentId}`);

    const refIncomes = await get(ref(database, "incomes"));
    const incomes = (await refIncomes.val()) as Record<string, IIncome>;

    let incomesToDelete: IIncome[] = [];

    if (incomes) {
      Object.entries(incomes).forEach(([id, value]) => {
        const income = value as IIncome;
        if (income.id === installmentId) {
          incomesToDelete.push(income);
        }
      });
    }

    for await (const income of incomesToDelete) {
      const refIncome = ref(database, `incomes/${income.id}`);
      await remove(refIncome);
    }
    incomesToDelete = [];

    await remove(refInstallments);

    refresh();

    setLoading(false);
  };

  return { handleDeleteInstallment };
};
