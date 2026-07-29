import { DateTime } from "luxon";
import { useMemo } from "react";
import { useInstallmentsList } from "../installments/use-installments-list";
import { isInstallmentActive } from "@/utils/installments";

const WEEKDAY_ORDER = [7, 1, 2, 3, 4, 5, 6] as const;

function getLocalizedWeekDays(): string[] {
  return WEEKDAY_ORDER.map((weekday) =>
    DateTime.fromObject({ weekday }).setLocale("pt-BR").toFormat("ccc")
  );
}

function getDaysOfMonth(
  dateISO: string,
  daysWithInstallment: number[]
): { id: string; day: string; hasInvoice: boolean }[] {
  const currentMonth = DateTime.fromISO(dateISO);

  if (!currentMonth.isValid || !currentMonth.daysInMonth) return [];

  const days: { id: string; day: string; hasInvoice: boolean }[] = [];

  for (let day = 1; day <= currentMonth.daysInMonth; day++) {
    days.push({
      id: `day-${day}`,
      day: String(day),
      hasInvoice: daysWithInstallment.includes(day),
    });
  }

  return days;
}

function getMonthStartPadding(dateISO: string): { id: string; day: string; hasInvoice: boolean }[] {
  const firstDayOfMonth = DateTime.fromISO(dateISO).startOf("month");
  const paddingCount = firstDayOfMonth.weekday % 7;

  return Array.from({ length: paddingCount }, (_, index) => ({
    id: `pad-${index}`,
    day: "",
    hasInvoice: false,
  }));
}

export const useCalendar = () => {
  const { products } = useInstallmentsList();
  const currentMonthISO = DateTime.now().toISO();

  const daysWithInstallments = useMemo(() => {
    return products
      .filter((item) =>
        isInstallmentActive({
          firstInstallmentISO: item.firstInstallmentDate,
          totalInstallments: item.installments,
          dueDay: item.dueDay,
        })
      )
      .map((item) => item.dueDay);
  }, [products]);

  const days = useMemo(
    () => getDaysOfMonth(currentMonthISO, daysWithInstallments),
    [currentMonthISO, daysWithInstallments]
  );

  const paddingDays = useMemo(
    () => getMonthStartPadding(currentMonthISO),
    [currentMonthISO]
  );

  const weekDays = useMemo(() => getLocalizedWeekDays(), []);
  const monthName = DateTime.now().setLocale("pt-BR").toFormat("LLLL yyyy");

  return { weekDays, paddingDays, days, monthName };
};
