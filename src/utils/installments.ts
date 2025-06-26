import { DateTime } from "luxon";

export function calculateRemainingMonths(data: {
  firstInstallmentISO: string;
  totalInstallments: number;
}): {
  percentage: number;
  installmentsPaid: number;
  totalInstallments: number;
  endDate: string;
} {
  const { firstInstallmentISO, totalInstallments } = data;
  const startDate = DateTime.fromISO(firstInstallmentISO).startOf("month");
  const today = DateTime.now().startOf("month");

  const monthsElapsed = today.diff(startDate, "months").months;
  const monthsPassed = Math.floor(monthsElapsed);

  const endDate = DateTime.fromISO(firstInstallmentISO)
    .plus({ months: 12 })
    .toISO();

  const percentage = (100 / totalInstallments) * monthsPassed;
  return {
    percentage,
    installmentsPaid: monthsPassed,
    totalInstallments,
    endDate: String(endDate),
  };
}
