import { colors } from "@/styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-radius: 8px;
  padding: 16px 0;
  color: rgba(0, 0, 0, 0.5);
  justify-content: center;

  * {
    color: rgba(0, 0, 0, 0.5);
  }
  span {
    color: rgba(0, 0, 0, 0.6);

    margin: 8px 0;
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    padding-left: 4px;
    border-radius: 4px;
    width: 250px;
    font-size: 14px;
  }
`;

export const SelectContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-height: 100px;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  span {
    color: rgba(0, 0, 0, 0.5);
  }

  select {
    border-color: rgba(0, 0, 0, 0.15);
    margin: 8px 0;
    padding: 4px 0;
    border-radius: 4px;
    width: 250px;
    background: none;
    font-size: 16px;
    font-weight: bold;

    option {
      color: rgba(0, 0, 0, 0.5);
      width: 250px;
    }
  }
`;

export const SectionPropertyValue = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  input {
    width: 140px;
    border: 0;
    font-size: 16px;
    font-weight: bold;
  }

  div {
    &:nth-child(1) {
      input {
        color: ${colors.green};
      }
    }

    &:nth-child(2) {
      input {
        color: ${colors.orange};
      }
    }

    &:nth-child(3) {
      input {
        color: ${colors.blue};
      }
    }
  }
`;
