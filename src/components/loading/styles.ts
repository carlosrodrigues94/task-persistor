import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 96px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.5);
  position: fixed;
  background: #dcdde1;

  svg {
    font-size: 24px;
    animation: spinner 0.8s linear infinite;

    @keyframes spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
