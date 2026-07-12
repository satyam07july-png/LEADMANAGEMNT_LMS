import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";

const SidebarFooter = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <footer className="space-y-4">

      {/* Quick Action Card */}

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-sm font-semibold text-slate-800">

              Quick Actions

            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">

              Create a new lead or manage CRM tasks instantly.

            </p>

          </div>

          <div className="rounded-xl bg-white p-2 shadow-sm">

            <Plus
              size={18}
              className="text-blue-600"
            />

          </div>

        </div>

        <button
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow-lg
          "
        >

          Create Lead

          <ArrowUpRight size={16} />

        </button>

      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-red-200
          bg-red-50
          text-sm
          font-semibold
          text-red-600
          transition-all
          duration-200
          hover:bg-red-100
          hover:shadow-md
          active:scale-[0.98]
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </footer>
  );
};

export default SidebarFooter;