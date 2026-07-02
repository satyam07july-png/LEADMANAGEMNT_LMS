import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";

import CampaignList from "../pages/campaign/CampaignList";

import LeadList from "../pages/lead/LeadList";

import EmployeeList from "../pages/employee/EmployeeList";

import AdmissionList from "../pages/admission/AdmissionList";

import StudentList from "../pages/student/StudentList";

import Reports from "../pages/reports/Reports";

import Settings from "../pages/settings/Settings";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/campaigns" element={<CampaignList />} />

          <Route path="/leads" element={<LeadList />} />

          <Route path="/employees" element={<EmployeeList />} />

          <Route path="/admissions" element={<AdmissionList />} />

          <Route path="/students" element={<StudentList />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}