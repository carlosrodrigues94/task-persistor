import { useCalendar } from "@/hooks/calendar/use-calendar";
import { Container, DayItem, WeekDaysContainer, DaysContainer } from "./styles";

export const CalendarInstallments = () => {
  const { weekDays, paddingDays, days, monthName } = useCalendar();

  const calendarDays = [...paddingDays, ...days];

  return (
    <Container>
      <h4>{monthName}</h4>
      <WeekDaysContainer>
        {weekDays.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </WeekDaysContainer>
      <DaysContainer>
        {calendarDays.map((item) => (
          <DayItem
            key={item.id}
            type="button"
            hasColor={item.hasInvoice}
            disabled={!item.day}
            aria-hidden={!item.day}
          >
            {item.day}
          </DayItem>
        ))}
      </DaysContainer>
    </Container>
  );
};
