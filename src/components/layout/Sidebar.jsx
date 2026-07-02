import { NavLink } from "react-router-dom";
import { sidebarMenu } from "./sidebarMenu";

const Sidebar = () => {
  return (
    <aside className="w-[280px] h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 shadow-xl">

      {/* Logo */}
      <div className="h-[72px] border-b border-slate-700 flex items-center px-6">

        <div>

          <h2 className="text-2xl font-bold tracking-wide">

            IEM CRM

          </h2>

          <p className="text-xs text-slate-400 mt-1">

            Admissions Platform

          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto py-5">

        {sidebarMenu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mx-4 mb-2 flex items-center rounded-xl px-5 py-3 transition-all duration-200

              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >

            {/* Custom SVG Icon */}

            <img
              src={item.icon}
              alt={item.name}
              className="w-5 h-5"
            />

            <span className="ml-4 font-medium">

              {item.name}

            </span>

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">

            D

          </div>

          <div>

            <h4 className="font-semibold">

              Divyanshu Mishra

            </h4>

            <p className="text-sm text-slate-400">

              Administrator

            </p>

          </div>

        </div>

        <button
          className="mt-5 w-full rounded-xl bg-red-600 py-3 font-medium transition hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;