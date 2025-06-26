import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  min-height: 150px;
  text-align: center;
  color: ${theme.colors.titleBoldTextColor};
`;
