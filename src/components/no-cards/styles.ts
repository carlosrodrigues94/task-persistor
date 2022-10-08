import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  text-align: center;
`;

export const ButtonRefresh = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 8px;
  border-radius: 8px;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
  margin: 8px 0;

  &:hover {
    filter: saturate(0.8);
  }
`;
