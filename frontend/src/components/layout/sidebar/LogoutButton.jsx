import { LogOut } from "lucide-react";

const LogoutButton = ({ collapsed }) => {

  return (

    <button className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-white text-sm font-mediumtext-red-600 transition hover:bg-red-600 hover:text-white">

      <LogOut size={18} />

      {!collapsed && "Logout"}

    </button>

  );

};

export default LogoutButton;