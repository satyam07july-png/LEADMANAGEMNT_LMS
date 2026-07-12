import SidebarHeader from "./SidebarHeader";
import SidebarProfile from "./SidebarProfile";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-slate-50/80
        backdrop-blur-xl
        shadow-xl
        shadow-slate-200/40
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <SidebarHeader />

      {/* Profile */}
      <div className="px-4 pt-4">
        <SidebarProfile />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden px-2">
        <SidebarNavigation />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-4 py-4">
        <SidebarFooter />
      </div>
    </aside>
  );
};

export default Sidebar;