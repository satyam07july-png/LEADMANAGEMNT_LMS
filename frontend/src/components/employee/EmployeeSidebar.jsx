import {
  LayoutDashboard,
  Users,
  PhoneCall,
  GraduationCap,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "./EmployeeSidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/employee/dashboard",
  },
  {
    title: "My Leads",
    icon: Users,
    path: "/employee/leads",
  },
  {
    title: "My Follow-ups",
    icon: PhoneCall,
    path: "/employee/followups",
  },
  {
    title: "My Admissions",
    icon: GraduationCap,
    path: "/employee/admissions",
  },
  {
    title: "Profile",
    icon: User,
    path: "/employee/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/employee/settings",
  },
];

const EmployeeSidebar = () => {
  return (
    <aside className="employee-sidebar">

      <div className="employee-sidebar-logo">
        <h2>IEM CRM</h2>
        <span>Employee Portal</span>
      </div>

      <nav className="employee-sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="employee-sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default EmployeeSidebar;