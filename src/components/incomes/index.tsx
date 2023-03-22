import React, { Fragment, useCallback, useMemo } from "react";
import { useCardsList } from "@/hooks/cards";
import { useIncomesDelete, useIncomesList } from "@/hooks/incomes";
import { colors } from "@/styles/colors";
import { ICard } from "@/types/card";
import { formatCurrency } from "@/utils";
import { MdOutlineClose, MdOutlineDoDisturbOn } from "react-icons/md";
import { Container, IncomeValue } from "./styles";
import { FaWallet } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

export const Incomes: React.FC<{ currentColor: string; cardId: string }> = ({
  currentColor,
  cardId,
}) => {
  const { cards } = useCardsList();
  const incomesList = useIncomesList();
  const { handleDeleteIncome } = useIncomesDelete();

  const card = useMemo((): ICard => {
    const result = cards.find((item) => item.id === cardId);

    if (!result)
      return {
        color: "",
        createdAt: "" as unknown as Date,
        id: "",
        isCalculator: true,
        isHidden: false,
        progressCalculatorIncremental: false,
        tasks: [],
        title: "",
      };

    return result;
  }, [cards]);

  const incomes = useMemo(() => {
    return incomesList.incomes.filter((item) => item.cardId === cardId);
  }, [incomesList]);

  const calculateProgress = useCallback(() => {
    const income = incomes.length ? incomes[0] : null;
    const completed = card.tasks.filter((item) => item.isCompleted);

    if (!income) {
      return {
        salaryRemainingProgress: 0,
        salaryRemaining: 0,
        twentyPercentOfSalary: 0,
        salaryProgress: 0,
      };
    }

    const twentyPercentOfSalary = income.amount / 5;

    if (!completed.length) {
      return {
        salaryRemainingProgress: 100,
        salaryRemaining: income.amount,
        twentyPercentOfSalary,
        salaryProgress: 0,
        isIndebtedness: false,
        indebtednessValue: 0,
      };
    }

    const { amount } = completed.reduce(
      (prev, curr) => {
        return { ...prev, amount: prev.amount + curr.amount };
      },
      { amount: 0 }
    );

    const salaryProgress = (amount / income.amount) * 100;
    const salaryRemaining = income.amount - amount;
    const salaryRemainingProgress = (salaryRemaining / income.amount) * 100;

    const result = {
      salaryRemainingProgress:
        salaryRemainingProgress < 0 ? 0 : salaryRemainingProgress,
      salaryRemaining: salaryRemaining < 0 ? 0 : salaryRemaining,
      salaryProgress: salaryProgress < 0 ? 0 : salaryProgress,
      twentyPercentOfSalary,
      isIndebtedness: salaryRemaining < 0,
      indebtednessValue: Math.abs(salaryRemaining),
    };

    return result;
  }, [card]);

  const calculated = calculateProgress();

  return (
    <Container>
      {incomes
        .filter((item) => item.cardId === cardId)
        .map((item) => (
          <Fragment key={item.id}>
            <button
              type="button"
              id="button-delete-income"
              onClick={() => handleDeleteIncome(item.id)}
            >
              <MdOutlineClose />
            </button>

            <IncomeValue
              progress={
                calculated.salaryProgress > 100
                  ? 100
                  : calculated.salaryProgress
              }
              currentColor={currentColor}
            >
              <span>
                <FaWallet />
                {formatCurrency(String(item.amount / 100))}
              </span>
            </IncomeValue>

            <IncomeValue
              progress={
                calculated.salaryRemainingProgress >= 100
                  ? 100
                  : calculated.salaryRemainingProgress
              }
              currentColor={
                calculated.salaryRemaining < calculated.twentyPercentOfSalary
                  ? colors.red
                  : colors.green
              }
            >
              <span>
                <MdSaveAlt />
                {formatCurrency(String(calculated.salaryRemaining / 100))}
              </span>
            </IncomeValue>

            {calculated.isIndebtedness && (
              <>
                <IncomeValue progress={100} currentColor={colors.red}>
                  <span>
                    <MdOutlineDoDisturbOn />
                    {formatCurrency(String(calculated.indebtednessValue / 100))}
                  </span>
                </IncomeValue>
              </>
            )}
          </Fragment>
        ))}
    </Container>
  );
};
