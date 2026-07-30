import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

export const InputContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${theme.colors.borderColor};
  background: ${({ isDisabled }) => (isDisabled ? "#eef0f3" : "#fafbfc")};
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    background: #fff;
    border-color: ${colors.green};
    box-shadow: 0 0 0 3px rgba(29, 209, 161, 0.18);
  }

  input {
    border: 0;
    background: transparent;
    padding: 0 12px;
    width: 100%;
    min-height: 42px;
    color: ${theme.colors.titleBoldTextColor};
    font-size: 14px;
    cursor: ${({ isDisabled }) => isDisabled && "not-allowed"};

    &::placeholder {
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;

export const ButtonEnableCalc = styled.button<{ isCalculator: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-left: 1px solid ${theme.colors.borderColor};
  padding: 0 14px;
  margin: 0;
  min-height: 42px;
  background: ${({ isCalculator }) =>
    isCalculator ? "rgba(29, 209, 161, 0.12)" : "rgba(0, 0, 0, 0.02)"};

  svg {
    color: ${(props) => {
      return props.isCalculator ? colors.green : "rgba(0, 0, 0, 0.45)";
    }};
  }

  &:hover {
    background: ${({ isCalculator }) =>
      isCalculator ? "rgba(29, 209, 161, 0.18)" : "rgba(0, 0, 0, 0.04)"};
  }
`;
