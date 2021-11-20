import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LabelInputCheckBox = styled.label<{ currentColor: string }>`
  display: flex;
  margin: 4px 0;
  width: 90%;
  max-width: 340px;
  padding: 4px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  span {
    margin: 0 0 0 8px;
    color: #888;
  }

  input {
    display: none;
  }

  svg {
    color: rgba(0, 0, 0, 0.5);
  }

  &:hover {
    cursor: pointer;
  }
`;
export const DivContentButtons = styled.div`
  display: flex;
  margin-left: 8px;

  span {
    color: rgba(0, 0, 0, 0.6);
  }

  button {
    height: 20px;
    width: 20px;
    margin: 0 2px;
    border: 0;
    border-radius: 4px;
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
      background: ${colors.red};
    }
    &:nth-child(2) {
      background: ${colors.green};
    }

    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;
