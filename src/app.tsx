import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import { Header } from "@/components/header";
import { Router } from "@/routes";
import { GlobalStyles } from "@/styles/global";

import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "@/components/loading";

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Loading />
        <Header />
        <ToastContainer />
        <GlobalStyles />
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
};
