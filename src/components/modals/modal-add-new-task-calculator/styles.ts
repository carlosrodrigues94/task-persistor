import styled from "styled-components";
import { colors } from "@/styles/colors";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;

  input {
    height: 40px;
    width: 250px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0 0 0 8px;
    accent-color: ${colors.green};
    margin: 4px 0;
  }
`;
