import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  flex-basis: 100%;
  padding: 16px 16px 0;
  flex-wrap: wrap;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid ${theme.colors.borderColor};
    border-radius: 6px;
    background: #fff;
    color: ${theme.colors.titleBoldTextColor};
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: #f5f6fa;
    }

    svg {
      font-size: 16px;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.titleBoldTextColor};
    font-size: 14px;
  }

  select {
    padding: 8px 12px;
    border: 1px solid ${theme.colors.borderColor};
    border-radius: 6px;
    background: #fff;
    color: ${theme.colors.textColor};
    font-size: 14px;
    cursor: pointer;
  }
`;
