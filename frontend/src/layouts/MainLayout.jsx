import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import Topbar from "../components/layout/Topbar/Topbar";
import PageContainer from "../components/PageContainer/PageContainer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ================= Sidebar ================= */}

      <Sidebar />

      {/* ================= Main Area ================= */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* ================= Topbar ================= */}

        <Topbar />

        {/* ================= Page ================= */}

        <PageContainer>

          <Outlet />

        </PageContainer>

      </div>

    </div>
  );
};

export default MainLayout;