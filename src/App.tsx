import React from "react";

import { Router } from "./routes";
import { GlobalStyles } from "./styles/global";
import { Header } from "./components/header";
import { ContextProvider } from "./contexts/context-provider";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Header />
      <GlobalStyles />
      <Router />
    </ContextProvider>
  );
};

export default App;
