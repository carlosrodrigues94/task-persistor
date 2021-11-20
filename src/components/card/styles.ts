import styled from "styled-components";
import { colors } from "../../styles/colors";

interface ContainerProps {
  currentColor: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 500px;
  width: 350px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 16px;
  transition: all 0.3s;
  position: relative;
  margin: 16px;

  div + label {
    margin-top: 40px;
  }

  .card-title {
    color: rgba(0, 0, 0, 0.5);
  }

  ::after {
    content: "";
    position: absolute;
    height: 150px;
    border-radius: 250px 0 0 0;
    filter: drop-shadow(0.5);
    opacity: 0.3;
    background: ${(props) => props.currentColor};
    bottom: 0;
    width: 100%;
  }
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  align-items: center;
  margin: 0 0 16px 0;
  button {
    width: 25px;
    height: 25px;
    border: 0;
    margin: 0 4px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      transition: all 0.1s;
      transform: scale(1.1);
    }
  }

  .button-delete-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    filter: saturate(1.1);
    position: absolute;
    right: 8px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 2px;

    &:hover {
      transform: none;
      background: ${colors.red};
    }
  }
`;

export const DivContentAddNewTask = styled.div<{ currentColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 8px 0;
  button {
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    background: ${(props) => props.currentColor};
    border: 0;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

export const ProgressContent = styled.div`
  height: 150px;
  width: 150px;
  margin: 0 0 16px 0;
`;
