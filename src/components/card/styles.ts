import styled from "styled-components";
import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";

interface ContainerProps {
  currentColor: string;
  isMaximized?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-height: ${({ isMaximized }) => (isMaximized ? "560px" : "500px")};
  width: ${({ isMaximized }) => (isMaximized ? "700px" : "350px")};
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 14px;
  transition: width 0.3s ease, min-height 0.3s ease;
  position: relative;
  margin: 16px;
  z-index: ${({ isMaximized }) => (isMaximized ? 1 : 0)};

  #a-download-json {
    display: none;
  }

  div + label {
    margin-top: 40px;
  }

  .button-minimize-card,
  .button-download-card,
  .button-maximize-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    filter: saturate(1.1);
    position: absolute;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    top: -8px;
    background: #fff;
    padding: 2px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .button-minimize-card {
    right: 18px;

    &:hover {
      transform: none;
      background: ${colors.yellow};
    }
  }

  .button-download-card {
    right: 46px;

    &:hover {
      transform: none;
      background: ${colors.cyan};
    }
  }

  .button-maximize-card {
    right: 102px;

    &:hover {
      transform: none;
      background: ${colors.green};
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
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 2px;
    top: -8px;
    right: -8px;
    background: #fff;

    &:hover {
      transform: none;
      background: ${colors.red};
    }
  }

  .card-created-at {
    width: 100%;
    margin: 0 0 8px 0;
    text-align: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    letter-spacing: 0.02em;
  }

  .card-title {
    color: rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    margin: 0 0 8px 0;

    h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
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

  .switch {
    margin-left: auto;

    .react-switch-bg {
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
`;

export const ColorPickerWrapper = styled.div`
  position: absolute;
  top: -8px;
  right: 74px;
  z-index: 2;

  .button-color-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    padding: 2px;
    cursor: pointer;

    span {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    &:hover {
      background: #f5f6fa;
    }
  }
`;

export const ColorDropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  padding: 8px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 3;

  button {
    width: 24px;
    height: 24px;
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.1);
    }

    &.is-selected {
      border-color: rgba(0, 0, 0, 0.35);
    }
  }
`;

export const SwitchAndButtonContent = styled.div<{ currentColor: string }>`
  display: flex;
  width: 100%;
  margin: 0 0 12px 0;

  #button-sort-tasks {
    font-size: 14px;
    background: none;
    width: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border: 0;
    color: ${({ currentColor }) => currentColor};
    border-radius: 4px;
    margin: 0 8px 0 4px;

    &:hover {
      color: #fff;
      background: ${({ currentColor }) => currentColor};
    }
  }

  #button-add-salary {
    display: flex;
    align-items: center;
    font-size: 14px;
    background: none;
    border: 1px solid ${theme.colors.borderColor};
    color: ${theme.colors.textColor};
    padding: 4px;
    border-radius: 4px;

    svg {
      margin-left: 12px;
    }

    &:hover {
      background: ${(props) => props.currentColor};
      color: #fff;
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
  display: flex;
  height: 150px;
  width: 100%;
  margin: 0 0 8px 0;
`;

export const TasksList = styled.div<{ isMaximized: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMaximized }) =>
    isMaximized ? "repeat(2, minmax(0, 1fr))" : "1fr"};
  gap: ${({ isMaximized }) => (isMaximized ? "10px" : "4px")};
  width: 100%;
  margin-top: 4px;
  z-index: 2;
`;
