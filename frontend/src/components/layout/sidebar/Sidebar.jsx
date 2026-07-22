import SidebarHeader from "./SidebarHeader";
import SidebarProfile from "./SidebarProfile";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import "./Sidebar.css";
const Sidebar = () => {
  return (
   <aside className="sidebar">

  {/* Header */}
  <div className="sidebar-header">
    <SidebarHeader />
  </div>

  {/* Profile */}
  <div className="sidebar-profile">
    <SidebarProfile />
  </div>

  {/* Navigation */}
  <div className="sidebar-nav">
    <SidebarNavigation />
  </div>

</aside>
  );
};

export default Sidebar;