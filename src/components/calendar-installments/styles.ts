import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  padding: 4px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  h4 {
    font-weight: bold;
  }
`;

export const DaysContainer = styled.div`
  max-width: 450px;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 fixed columns */
  gap: 1px;
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

  @media (max-width: 420px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
    margin: 2px;
  }
`;
export const WeekDaysContainer = styled.div`
  max-width: 450px;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 fixed columns */
  gap: 1px;
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

  @media (max-width: 420px) {
    span {
      margin: 1px 2px;
      width: 42px;
      height: 42px;
      padding: 2px;
      font-size: 14px;
    }
  }
`;
