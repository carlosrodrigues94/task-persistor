import styled from "styled-components";

export const Container = styled.div<{ isDetailed: boolean }>`
  z-index: 2;
  display: flex;
  align-items: ${({ isDetailed }) => (isDetailed ? "stretch" : "center")};
  justify-content: center;
  width: 100%;
  min-width: 0;
`;

export const LabelInputCheckBox = styled.label<{
  currentColor: string;
  isDetailed: boolean;
  isCompleted: boolean;
}>`
  display: flex;
  align-items: ${({ isDetailed }) => (isDetailed ? "flex-start" : "center")};
  margin: ${({ isDetailed }) => (isDetailed ? "0" : "4px 0")};
  width: 100%;
  max-width: ${({ isDetailed }) => (isDetailed ? "none" : "340px")};
  padding: ${({ isDetailed }) => (isDetailed ? "10px 10px 10px 8px" : "4px 0")};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: ${({ isDetailed }) => (isDetailed ? "8px" : "4px")};
  background: ${({ isDetailed }) => (isDetailed ? "#fafbfc" : "transparent")};
  min-width: 0;
  gap: 8px;

  > span {
    margin: 0;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  input {
    display: none;
  }

  > svg {
    flex-shrink: 0;
    margin-top: ${({ isDetailed }) => (isDetailed ? "2px" : "0")};
    color: rgba(0, 0, 0, 0.5);
  }

  &:hover {
    cursor: pointer;
    border-color: ${({ currentColor, isDetailed }) =>
      isDetailed ? currentColor : "rgba(0, 0, 0, 0.1)"};
  }
`;

export const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  flex: 1;
`;

export const TaskTitle = styled.span<{ isCompleted: boolean }>`
  color: ${({ isCompleted }) =>
    isCompleted ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.7)"} !important;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? "line-through" : "none"};
`;

export const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    white-space: nowrap !important;
    overflow: visible !important;
    text-overflow: unset !important;

    svg {
      font-size: 12px;
    }
  }

  .amount {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
  }

  .status {
    margin-left: auto;
    padding: 2px 6px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.06);
    font-size: 11px;
    font-weight: 600;
  }
`;

export const DueDateBadge = styled.span<{
  color: string;
  background: string;
  isCompleted: boolean;
  isCompact?: boolean;
}>`
  display: inline-flex !important;
  align-items: center;
  gap: 4px;
  padding: ${({ isCompact }) => (isCompact ? "2px 6px" : "3px 8px")};
  border-radius: 999px;
  font-size: ${({ isCompact }) => (isCompact ? "10px" : "12px")} !important;
  font-weight: 600;
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: unset !important;
  flex-shrink: 0;
  color: ${({ color, isCompleted }) =>
    isCompleted ? "rgba(0, 0, 0, 0.4)" : color} !important;
  background: ${({ background, isCompleted }) =>
    isCompleted ? "rgba(0, 0, 0, 0.05)" : background} !important;

  svg {
    font-size: ${({ isCompact }) => (isCompact ? "10px" : "12px")};
    color: inherit;
  }
`;

export const DivContentButtons = styled.div<{
  currentColor: string;
  isDetailed: boolean;
}>`
  display: flex;
  margin-left: 8px;
  flex-direction: ${({ isDetailed }) => (isDetailed ? "column" : "row")};
  justify-content: ${({ isDetailed }) =>
    isDetailed ? "flex-start" : "center"};
  gap: ${({ isDetailed }) => (isDetailed ? "4px" : "0")};
  padding-top: ${({ isDetailed }) => (isDetailed ? "8px" : "0")};

  span {
    color: rgba(0, 0, 0, 0.6);
  }

  button {
    height: 20px;
    width: 20px;
    margin: ${({ isDetailed }) => (isDetailed ? "0" : "0 2px")};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: ${(props) => props.currentColor};
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;
