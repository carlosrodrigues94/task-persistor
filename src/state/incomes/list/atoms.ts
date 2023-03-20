import { selector } from "recoil";
import { authState } from "@/state/auth/atoms";
import { onValue, ref } from "firebase/database";
import { database } from "@/services/firebase";
import { toast } from "react-toastify";
import { IIncome } from "@/types/income";

export const incomesListState = selector({
  key: `incomesListState`,

  get: ({ get }): IIncome[] => {
    try {
      const { id } = get(authState);

      if (!id) return [];

      const refIncomes = ref(database, `incomes`);

      let incomes: IIncome[] = [];

      onValue(refIncomes, (snapshot) => {
        if (!snapshot.val()) {
          incomes = [];
          return;
        }
        const data = snapshot.val() as Record<string, any>;

        incomes = Object.entries(data).map(([key, value]) => {
          return <IIncome>{
            id: key,
            amount: value.amount,
            cardId: value.cardId,
            title: value.title,
          };
        });
      });

      return incomes;
    } catch (err) {
      const error = err as Record<string, string>;
      toast.error(error.message);
      return [];
    }
  },
});
