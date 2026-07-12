import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="flex h-11 w-80 items-center rounded-xl border border-slate-200 bg-slate-50 px-4">

      <Search
        size={18}
        className="text-slate-400"
      />

      <input
        placeholder="Search..."
        className="ml-3 w-full bg-transparent outline-none"
      />

    </div>
  );
};

export default SearchBox;