import { installmentsListState } from "@/state/installments/list/atoms";
import { maskCurrencyBRL } from "@/utils";
import { calculateRemainingMonths } from "@/utils/installments";
import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilValue,
} from "recoil";

export const useInstallmentsList = () => {
  const installments = useRecoilValue(installmentsListState);
  const refresh = useRecoilRefresher(installmentsListState);

  const handleRefreshInstallmentsList = useCallback(() => {
    refresh();
  }, [refresh]);

  const products = useMemo(
    () =>
      installments.map((item) => {
        let { installmentsPaid } = calculateRemainingMonths({
          firstInstallmentISO: item.firstInstallmentDate,
          totalInstallments: item.installments,
        });

        if (installmentsPaid >= item.installments) {
          installmentsPaid = item.installments;
        }
        const installmentPrice = Math.trunc(item.amount / item.installments);
        const amountPaid = installmentPrice * installmentsPaid;
        let amountRemaining = item.amount - amountPaid;

        if (amountRemaining < 0) {
          amountRemaining = 0;
        }

        const monthFirstInstallment =
          new Date(item.firstInstallmentDate).getMonth() + 1;
        const dueDate = `${item.dueDay}/${monthFirstInstallment}`;

        return {
          ...item,
          amountPaidFormated: maskCurrencyBRL(amountPaid / 100),
          amountFormated: maskCurrencyBRL(item.amount / 100),
          amountRemainingFormated: maskCurrencyBRL(amountRemaining / 100),
          installmentsPaid,
          dueDate,
        };
      }),
    [installments]
  );

  return {
    handleRefreshInstallmentsList,
    installments,
    products,
  };
};
