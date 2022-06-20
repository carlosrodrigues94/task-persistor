import { ModalCheckPassword } from "@/components/check-password/index";
import { Header } from "@/components/header/index";
import { ContextProvider } from "@/contexts/context-provider";
import { GlobalStyles } from "@/styles/global";
import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
      <ModalCheckPassword isOpen />
      <Header />
      <GlobalStyles />
    </ContextProvider>
  );
};

export default MyApp;
