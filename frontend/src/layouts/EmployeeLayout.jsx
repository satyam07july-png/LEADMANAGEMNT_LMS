import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeTopbar from "../components/employee/EmployeeTopbar";
import EmployeeFooter from "../components/employee/EmployeeFooter";

import "./EmployeeLayout.css";

const EmployeeLayout = () => {
  return (
    <div className="employee-layout">
      <EmployeeSidebar />

      <div className="employee-main">
        <EmployeeTopbar />

        <main className="employee-content">
          <Outlet />
        </main>

        <EmployeeFooter />
      </div>
    </div>
  );
};

export default EmployeeLayout;