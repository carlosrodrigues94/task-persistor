export type CalculatePercentage = (data: {
  expense: number;
  income: number;
}) => {
  percentage: number;
  isMoreThanOneHundred: boolean;
};

export const calculatePercentage: CalculatePercentage = ({
  expense,
  income,
}) => {
  const result = Math.round((expense / income) * 100);

  const isMoreThanOneHundred = result > 100;
  return {
    isMoreThanOneHundred,
    percentage: isMoreThanOneHundred ? 100 : result,
  };
};
