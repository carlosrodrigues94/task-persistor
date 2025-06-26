import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 450px;

  h4 {
    font-weight: bold;
    margin: 0 auto;
  }
`;

export const DayItem = styled.button<{ hasColor: boolean }>`
  background: ${({ hasColor }) => (hasColor ? colors.blue : "#fff")};
  border-radius: 50%;
  padding: 2px;
  color: ${({ hasColor }) => (hasColor ? "#fff" : "#777")};
  margin: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid ${theme.colors.borderColor};
`;
export const WeekDaysContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 4px;
  width: 100%;
  color: ${theme.colors.boldTextColor};

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px 4px;
    padding: 4px;
    font-weight: bold;
    width: 48px;
  }
`;
