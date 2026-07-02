import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="ml-[280px] min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;