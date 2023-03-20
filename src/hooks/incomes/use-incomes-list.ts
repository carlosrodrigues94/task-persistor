import { incomesListState } from "@/state/incomes/list/atoms";
import { useCallback } from "react";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilValue,
} from "recoil";

export const useIncomesList = () => {
  const incomes = useRecoilValue(incomesListState);
  const refresh = useRecoilRefresher(incomesListState);

  const handleRefreshIncomesList = useCallback(() => {
    refresh();
  }, [refresh]);

  return {
    incomes,
    handleRefreshIncomesList,
  };
};
