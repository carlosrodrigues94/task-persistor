import { useCalendar } from "@/hooks/calendar/use-calendar";
import { Container, DayItem, WeekDaysContainer } from "./styles";

export const CalendarInstallments = () => {
  const { weekDays, addEmptySpace, days, monthName } = useCalendar();

  const handleClickShowInvoices = () => {};
  return (
    <Container>
      <h4>{monthName}</h4>
      <WeekDaysContainer>
        {weekDays.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </WeekDaysContainer>
      {[...addEmptySpace(days[0].weekName), ...days].map((item) => (
        <DayItem
          onClick={handleClickShowInvoices}
          key={item.day}
          hasColor={item.hasInvoice}
        >
          {item.day}
        </DayItem>
      ))}
    </Container>
  );
};
