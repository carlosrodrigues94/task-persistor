import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;
  background: #f5f6fa;
  padding-bottom: 50px;
  width: 100%;

  #img-logo {
    margin: auto 0;
  }
`;

export const CardsGrid = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
