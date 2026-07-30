import styled from "styled-components";
import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 16px;
`;

export const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  width: min(420px, 100%);
  background: #fff;
  border-radius: 12px;
  border: 1px solid ${theme.colors.borderColor};
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.18);
  overflow: hidden;

  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 56px;
    width: 100%;
    padding: 16px 20px;
    background: linear-gradient(
      135deg,
      ${colors.green} 0%,
      ${colors.cyan} 100%
    );
    color: ${theme.colors.titleTextLight};

    strong {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }
  }

  .form-content-modal {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 20px;
  }

  .div-modal-content-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    padding-top: 4px;

    button {
      margin: 0;
      border: 0;
      border-radius: 8px;
      min-height: 40px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 600;
      transition: filter 0.2s ease, transform 0.2s ease;

      &:nth-child(1) {
        background: #fff;
        color: ${theme.colors.titleBoldTextColor};
        border: 1px solid ${theme.colors.borderColor};

        &:hover {
          background: #f5f6fa;
        }
      }

      &:nth-child(2) {
        background: ${colors.green};
        color: #fff;

        &:hover {
          filter: brightness(0.92);
        }
      }

      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
`;
