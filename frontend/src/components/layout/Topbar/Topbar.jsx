import SearchBox from "./SearchBox";
import Notification from "./Notification";
import UserMenu from "./UserMenu";

const Topbar = () => {
  return (
    <header
      className="
      sticky
      top-0
      z-40
      flex
      h-20
      items-center
      justify-between
      border-b
      border-slate-200
      bg-white
      px-8
    "
    >
      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-slate-900">

          

        </h1>

        <p className="text-sm text-slate-500">

        

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <SearchBox />

        <Notification />

        <UserMenu />

      </div>

    </header>
  );
};

export default Topbar;