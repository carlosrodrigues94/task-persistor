import { DateTime } from "luxon";
import { useMemo } from "react";
import { useInstallmentsList } from "../installments/use-installments-list";

const getDaysOfMonth = (
  dateISO: string,
  daysWithInstallment: number[]
): { weekName: string; day: string; hasInvoice: boolean }[] => {
  const now = DateTime.fromISO(dateISO);
  const days: { weekName: string; day: string; hasInvoice: boolean }[] = [];

  if (!now.daysInMonth) return [];

  for (let item = 0; item < now.daysInMonth; item++) {
    const day = item + 1;

    const weekName = now.set({ day }).toFormat("ccc");
    const dayNumber = now.set({ day }).toFormat("dd");
    days.push({
      day: dayNumber,
      weekName,
      hasInvoice: daysWithInstallment.includes(day) ? true : false,
    });
  }

  return days;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const addEmptySpace = (weekDay: string) => {
  const dict: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };

  let arr = Array.from({ length: dict[weekDay] });

  let result = arr.map(() => ({ day: "", hasInvoice: false }));

  return result;
};

export const useCalendar = () => {
  const { products } = useInstallmentsList();
  const daysWithInstallments = useMemo(() => {
    return products
      .filter((item) => {
        if (new Date(item.firstInstallmentDate) > new Date()) {
          return false;
        }
        return true;
      })
      .map((item) => item.dueDay);
  }, [products]);

  const days = getDaysOfMonth(DateTime.now().toISO(), daysWithInstallments);

  const monthName = DateTime.now().monthLong;
  return { weekDays, addEmptySpace, days, monthName };
};
