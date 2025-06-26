import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10px;
  min-height: 80vh;
  min-width: 405px;

  @media (max-width: 1042px) {
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }
`;
