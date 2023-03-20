import { ITask } from "@/types/task";
import { formatCurrency } from "./format-currency";

export const formatCentsValueToCurrencyString = (value: number) => {
  return formatCurrency(String(value / 100));
};

export const calculateProgressIncremental = (
  tasks: ITask[],
  cardId: string
) => {
  const { amount } = tasks
    .filter((task) => task.cardId === cardId)
    .filter((task) => !task.isCompleted)
    .reduce(
      (prev, curr) => {
        return { ...prev, amount: prev.amount + curr.amount };
      },
      { amount: 0 }
    );

  return formatCentsValueToCurrencyString(amount);
};

export const calculateProgressDecremental = (tasks: ITask[]) => {
  const { amount } = tasks.reduce(
    (prev, curr) => {
      return { ...prev, amount: prev.amount - curr.amount };
    },
    { amount: 0 }
  );

  return formatCentsValueToCurrencyString(amount);
};
