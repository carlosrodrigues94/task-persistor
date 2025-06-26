import { colors } from "@/styles/colors";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 4px 0;
  }

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
