import { Plus } from "lucide-react";

const QuickAction = ({ collapsed }) => {

  return (

    <div className="mt-5">

      <button className="flex h-11 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700">

        <Plus size={18} />

        {!collapsed && "Add New Lead"}

      </button>

    </div>

  );

};

export default QuickAction;