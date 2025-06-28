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
  const startDate = DateTime.fromISO(
    new Date(firstInstallmentISO).toISOString()
  ).startOf("month");
  const today = DateTime.now().set({ month: 7 });

  const monthsElapsed = today.diff(startDate, "months").months;
  let monthsPassed = Math.floor(monthsElapsed);

  if (monthsPassed <= 0) {
    monthsPassed = 0;
  }

  const endDate = DateTime.fromISO(firstInstallmentISO)
    .plus({ months: totalInstallments })
    .toISO();

  const percentage = (100 / totalInstallments) * monthsPassed;
  return {
    percentage,
    installmentsPaid: monthsPassed,
    totalInstallments,
    endDate: String(endDate),
  };
}
