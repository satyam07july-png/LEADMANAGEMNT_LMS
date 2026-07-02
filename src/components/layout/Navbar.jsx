import { Menu, Search, Bell } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 h-[72px] bg-white border-b border-slate-200 px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 h-11 w-[380px]">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search campaigns, leads, students..."
            className="ml-3 bg-transparent outline-none w-full text-sm"
          />

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative">

          <Bell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Divider */}

        <div className="w-px h-8 bg-slate-300"></div>

        {/* Profile */}

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">

            D

          </div>

          <div className="hidden md:block">

            <h4 className="text-sm font-semibold text-slate-800">

              Divyanshu Mishra

            </h4>

            <p className="text-xs text-slate-500">

              Administrator

            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;