import { ChevronDown } from "lucide-react";

const UserMenu = () => {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">

        A

      </div>

      <div>

        <h3 className="text-sm font-semibold">

          Admin

        </h3>

        <p className="text-xs text-slate-500">

          Administrator

        </p>

      </div>

      <ChevronDown size={18} />

    </button>
  );
};

export default UserMenu;