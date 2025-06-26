import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const ContainerInstallmentPayments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1042px) {
    margin-top: 16px;
    width: 90%;
  }
`;

export const InstallmentsTitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0 0 4px 0;
  min-width: 400px;

  h2 {
    margin-left: auto;
    font-size: 18px;
    font-weight: bold;
    color: ${theme.colors.titleBoldTextColor};
  }
  button {
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.borderColor};
    padding: 4px;
    border-radius: 50%;
    margin-left: auto;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const ContainerInstallment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  border: 1px solid ${theme.colors.borderColor};
  padding: 4px;
  margin: 4px 0;
  border-radius: 4px;
  position: relative;
`;

export const Installment = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;

  span:nth-child(3) {
    justify-content: flex-end;
  }
`;

export const InstallmentProgress = styled.span<{
  totalInstallments: number;
  paidInstallments: number;
}>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 12px;
  margin: 6px 4px;
  border-radius: 4px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ totalInstallments, paidInstallments }) =>
      (100 / totalInstallments) * paidInstallments}%;
    background: ${colors.green};
    height: 100%;
  }
`;

export const ContentItemTitleAndValue = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  font-weight: bold;
  margin: 2px 0;
  color: ${theme.colors.boldTextColor};

  span:nth-child(1) {
    color: ${colors.blue};
  }
`;

export const ItemDetails = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  width: 120px;
  color: ${theme.colors.textColor};
`;
