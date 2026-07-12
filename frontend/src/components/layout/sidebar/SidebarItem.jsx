import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
        group
        relative
        flex
        h-12
        items-center
        gap-3
        rounded-2xl
        px-4
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1"
        }
      `
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
          )}

          <Icon
            size={20}
            className={`shrink-0 transition-transform duration-200 ${
              isActive ? "scale-110" : "group-hover:scale-110"
            }`}
          />

          <span className="truncate flex-1">
            {item.title}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;