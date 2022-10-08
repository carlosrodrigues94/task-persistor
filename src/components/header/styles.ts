import styled from "styled-components";
import { colors } from "@/styles/colors";

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
  padding: 0 8px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 8px 0 0;
  background: #fff;
  padding: 0;

  input {
    border: 0;
    padding: 0 0 0 8px;
    width: 60%;
    border-radius: 8px;
    max-width: 150px;
    margin-right: auto;
  }
`;

export const ButtonAddCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 8px 8px 0;
  color: rgba(0, 0, 0, 0.5);
  border: 0;
  width: 42px;
  height: 100%;
  margin: 0;
  background: rgba(0, 0, 0, 0.02);
  font-size: 18px;

  &:hover {
    filter: saturate(0.8);
    color: ${colors.blue};
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

export const AvatarContainer = styled.div`
  display: flex;
  border-radius: 32px;
  border: 2px solid ${colors.blue};
  margin: 0 8px;

  img {
    object-fit: contain;
    width: 42px;
    height: 42px;
    border-radius: 32px;
  }
`;

export const UserName = styled.span`
  font-size: 14px;
  margin: 0 8px;
  margin-right: auto;

  @media (max-width: 764px) {
    display: none;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 8px;
  border-radius: 8px;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    filter: saturate(0.8);
  }
`;
