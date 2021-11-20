import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -moz-osx-font-smoothing: grayscale;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  body,
  input,
  button {
    font-size: 16px;
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: 500;
  }
  button {
    cursor: pointer;
    transition: all 0.3s;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
