import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import LeadManagement from "../pages/Lead/LeadManagement";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Login */}

      <Route element={<AuthLayout />}>
        <Route
          path="/"
          element={<Login />}
        />
      </Route>

      {/* Dashboard */}

      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>

      {/* Lead Management */}

      <Route element={<MainLayout />}>
        <Route
          path="/leads"
          element={<LeadManagement />}
        />

          

      </Route>

    </Routes>
  );
};

export default AppRoutes;