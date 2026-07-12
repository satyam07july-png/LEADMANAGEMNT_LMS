import { ChevronDown } from "lucide-react";

const SidebarProfile = () => {
  return (
    <div className="border-b border-slate-200 px-6 py-5">

      <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:bg-slate-50">

        <div className="flex items-center gap-4">

          {/* Avatar */}

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">

              A

            </div>

            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>

          </div>

          {/* User */}

          <div className="text-left">

            <h3 className="text-lg font-semibold text-slate-900">

              Admin

            </h3>

            <p className="text-sm text-slate-500">

              Administrator

            </p>

          </div>

        </div>

        <ChevronDown
          size={20}
          className="text-slate-400"
        />

      </button>

    </div>
  );
};

export default SidebarProfile;
