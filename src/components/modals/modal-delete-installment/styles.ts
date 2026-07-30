import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 72px;
  text-align: center;
  color: ${theme.colors.titleBoldTextColor};

  h3 {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.45;
    color: ${theme.colors.textColor};
  }
`;
