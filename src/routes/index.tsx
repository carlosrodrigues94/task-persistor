import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@/pages/dashboard";
import { Calendar } from "@/pages/calendar";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};
