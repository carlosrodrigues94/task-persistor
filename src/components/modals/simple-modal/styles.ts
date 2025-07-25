import styled from "styled-components";
import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 400px;
  background: #fff;
  border-radius: 4px;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: 0 0 auto 0;
    width: 100%;
    background: ${colors.green};
    border-radius: 4px 4px 0 0;
    color: ${theme.colors.titleTextLight};
  }

  .form-content-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90%;
    width: 100%;
  }

  .div-modal-content-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: auto 0 0 0;
    width: 100%;
    border-radius: 0 0 4px 4px;
    padding: 0 0 8px 0;
    button {
      margin: 0 8px;
      border: 0;
      color: #fff;
      border-radius: 4px;
      height: 35px;
      padding: 0 8px;
      font-weight: bold;

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
  }
`;
