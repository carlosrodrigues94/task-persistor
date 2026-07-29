import { DateTime } from "luxon";

export function calculateRemainingMonths(data: {
  firstInstallmentISO: string;
  totalInstallments: number;
  dueDay: number;
}): {
  percentage: number;
  installmentsPaid: number;
  totalInstallments: number;
  endDate: string;
  isCompleted: boolean;
} {
  const { firstInstallmentISO, totalInstallments, dueDay } = data;

  const startDate = DateTime.fromISO(firstInstallmentISO, { zone: "local" }).startOf(
    "day"
  );
  const today = DateTime.now().startOf("day");

  const endDate = startDate
    .plus({ months: totalInstallments - 1 })
    .set({
      day: Math.min(
        dueDay,
        startDate.plus({ months: totalInstallments - 1 }).daysInMonth ?? dueDay
      ),
    })
    .toISODate();

  if (!startDate.isValid || today < startDate) {
    return {
      percentage: 0,
      installmentsPaid: 0,
      totalInstallments,
      endDate: endDate ?? "",
      isCompleted: false,
    };
  }

  let installmentsPaid = 0;

  for (let index = 0; index < totalInstallments; index++) {
    const monthDate = startDate.plus({ months: index });
    const dueDate = monthDate.set({
      day: Math.min(dueDay, monthDate.daysInMonth ?? dueDay),
    });

    if (today >= dueDate) {
      installmentsPaid = index + 1;
      continue;
    }

    break;
  }

  installmentsPaid = Math.min(installmentsPaid, totalInstallments);
  const isCompleted = installmentsPaid >= totalInstallments;
  const percentage = Math.min(
    100,
    (installmentsPaid / totalInstallments) * 100
  );

  return {
    percentage,
    installmentsPaid,
    totalInstallments,
    endDate: endDate ?? "",
    isCompleted,
  };
}

export function isInstallmentActive(data: {
  firstInstallmentISO: string;
  totalInstallments: number;
  dueDay: number;
}): boolean {
  const { isCompleted } = calculateRemainingMonths(data);
  const startDate = DateTime.fromISO(data.firstInstallmentISO, { zone: "local" }).startOf(
    "day"
  );
  const today = DateTime.now().startOf("day");

  return startDate.isValid && today >= startDate && !isCompleted;
}
