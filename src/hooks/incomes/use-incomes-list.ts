import { incomesListState } from "@/state/incomes/list/atoms";
import { useRecoilValue } from "recoil";

export const useIncomesList = () => {
  const incomes = useRecoilValue(incomesListState);

  return {
    incomes,
  };
};
