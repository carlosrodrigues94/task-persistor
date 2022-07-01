import { Home } from "@/pages/home";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
