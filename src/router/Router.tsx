import { Routes, Route } from "react-router-dom";
import LoginView from "@/pages/LoginView";
import ProtectedRoute from "./ProtectedRoute";
import { DashboardView } from "@/pages/DashboardView";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
