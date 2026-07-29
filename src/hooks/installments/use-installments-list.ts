import { installmentsListState } from "@/state/installments/list/atoms";
import { maskCurrencyBRL } from "@/utils";
import { calculateRemainingMonths } from "@/utils/installments";
import { useCallback, useMemo } from "react";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilValueLoadable,
} from "recoil";

export const useInstallmentsList = () => {
  const loadable = useRecoilValueLoadable(installmentsListState);
  const refresh = useRecoilRefresher(installmentsListState);

  const installments =
    loadable.state === "hasValue" ? loadable.contents : [];

  const handleRefreshInstallmentsList = useCallback(() => {
    refresh();
  }, [refresh]);

  const products = useMemo(
    () =>
      installments.map((item) => {
        const progress = calculateRemainingMonths({
          firstInstallmentISO: item.firstInstallmentDate,
          totalInstallments: item.installments,
          dueDay: item.dueDay,
        });

        const installmentsPaid = progress.installmentsPaid;
        const amountPaid = item.amountEachInstallment * installmentsPaid;
        const amountRemaining = Math.max(0, item.amount - amountPaid);
        const dueDate = `Dia ${item.dueDay}`;

        return {
          ...item,
          amountPaidFormated: maskCurrencyBRL(amountPaid / 100),
          amountFormated: maskCurrencyBRL(item.amount / 100),
          amountRemainingFormated: maskCurrencyBRL(amountRemaining / 100),
          amountEachInstallmentFormated: maskCurrencyBRL(
            item.amountEachInstallment / 100
          ),
          installmentsPaid,
          dueDate,
          isCompleted: progress.isCompleted,
          percentage: progress.percentage,
        };
      }),
    [installments]
  );

  return {
    handleRefreshInstallmentsList,
    installments,
    products,
    isLoading: loadable.state === "loading",
  };
};
