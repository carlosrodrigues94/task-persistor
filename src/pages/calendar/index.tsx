import { CalendarInstallments } from "@/components/calendar-installments";
import { Container } from "./styles";
import { InstallMentsList } from "@/components/installments-list";

export const Calendar = () => {
  return (
    <Container>
      <CalendarInstallments />
      <InstallMentsList />
    </Container>
  );
};
