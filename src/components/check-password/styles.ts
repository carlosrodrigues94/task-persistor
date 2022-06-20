import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  width: 50%;
  flex-direction: column;
  background: #fff;
  min-height: 80px;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 450px;
`;

export const ButtonsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Input = styled.input<{ isErrored: boolean }>`
  display: flex;
  border-radius: 8px;
  border: 1px solid
    ${({ isErrored }) => (isErrored ? colors.red : "rgba(0, 0, 0, 0.2)")};
  margin: 16px 0;
  height: 40px;
  width: 250px;
  padding: 0 14px;
`;
