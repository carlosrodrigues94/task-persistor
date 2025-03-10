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

  .button-calculate-financing {
    margin-right: 8px;
  }
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
  position: relative;

  img {
    object-fit: contain;
    width: 42px;
    height: 42px;
    border-radius: 32px;
  }

  &:hover {
    cursor: pointer;
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

export const ListHiddenItems = styled.ul<{ isDropdownOpen: boolean }>`
  display: ${({ isDropdownOpen }) => (isDropdownOpen ? "flex" : "none")};
  min-width: 150px;
  flex-direction: column;
  top: 64px;
  position: absolute;
  background: #dcdde1;
  border-radius: 4px;
  padding: 6px;
  max-height: 500px;
  overflow-y: auto;
  min-width: 240px;

  li {
    display: flex;
    height: 34px;
    align-items: center;
    list-style: none;
    width: 100%;
    font-size: 14px;
    margin: 4px 0;

    button {
      margin: 0 0 0 auto;
      height: 32px;
      width: 32px;
      svg {
        font-size: 14px;
      }
    }
  }
`;
