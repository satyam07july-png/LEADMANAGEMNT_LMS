import menuItems from "./menuItems";
import SidebarGroup from "./SidebarGroup";

const SidebarNavigation = () => {
  return (
    <div className="flex-1 overflow-hidden px-2">
      <div className="space-y-2">

        {menuItems.map((group) => (
          <SidebarGroup
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}

      </div>
    </div>
  );
};

export default SidebarNavigation;