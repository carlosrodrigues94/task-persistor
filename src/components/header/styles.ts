import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  z-index: 2;
  position: relative;
  position: sticky;
  background: #dcdde1;
  top: 0;

  form {
    display: flex;
    align-items: center;
    justify-content: center;

    .input-new-card {
      height: 40px;
      width: 250px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0 0 0 8px;
      margin: 0 16px 0 0;
    }

    button[type="submit"] {
      display: flex;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 8px 16px;
      border-radius: 8px;
      color: rgba(0, 0, 0, 0.5);

      &:hover {
        filter: saturate(0.8);
      }
    }
  }
`;

export const ButtonEnableCalc = styled.button<{ isCalculator: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid;
  padding: 6px 14px;
  border-radius: 8px;
  margin: 0 8px;
  margin-left: 2px;
  border-color: ${(props) => {
    return props.isCalculator ? colors.green : "rgba(0, 0, 0, 0.05);";
  }};

  svg {
    color: ${(props) => {
      return props.isCalculator ? colors.green : "rgba(0, 0, 0, 0.5)";
    }};
  }
`;
