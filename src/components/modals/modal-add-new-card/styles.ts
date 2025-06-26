import { colors } from "@/styles/colors";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  width: 100%;
  margin: 16px 0;
`;

export const InputContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 8px 0 0;
  background: ${({ isDisabled }) => (isDisabled ? "#dcdde1" : "#fff")};
  padding: 0;

  input {
    border: 0;
    padding: 0 0 0 8px;
    width: 60%;
    border-radius: 8px;
    max-width: 150px;
    margin-right: auto;
    cursor: ${({ isDisabled }) => isDisabled && "not-allowed"};

    @media (max-width: 500px) {
      width: 100px;
    }
  }
`;

export const ButtonEnableCalc = styled.button<{ isCalculator: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid;
  padding: 6px 14px;
  border-radius: 0;
  margin: 0;
  height: 100%;
  border: 0;
  background: rgba(0, 0, 0, 0.02);

  svg {
    color: ${(props) => {
      return props.isCalculator ? colors.green : "rgba(0, 0, 0, 0.5)";
    }};
  }
`;
