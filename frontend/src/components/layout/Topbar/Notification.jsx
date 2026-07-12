import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-100">

      <Bell size={20} />

      <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>

    </button>
  );
};

export default Notification;