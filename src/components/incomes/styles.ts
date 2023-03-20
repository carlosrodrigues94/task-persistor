import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  height: 150px;
  width: 250px;
  color: ${theme.colors.textColor};
  font-size: 14px;
  padding: 4px;

  > span {
    display: flex;
    width: 100%;
  }
`;

export const IncomeValue = styled.div<{
  progress: number;
  currentColor: string;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20px;
  border: 1px solid ${theme.colors.borderColor};
  border-radius: 4px;
  position: relative;
  margin: 2px 0 8px 0;
  align-items: center;
  justify-content: center;

  span {
    color: ${({ progress }) =>
      progress >= 100 ? "#fff" : theme.colors.boldTextColor};
    margin: 0 2px 0 auto;
    font-size: 12px;
  }

  &:before {
    content: "";
    height: 100%;
    border-radius: 3px;
    position: absolute;
    left: 0;
    z-index: -1;
    transition: all 0.3s;
    width: ${(props) => props.progress}%;
    background: ${(props) => props.currentColor};
  }
`;
