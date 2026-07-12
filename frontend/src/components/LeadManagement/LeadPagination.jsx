import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const LeadPagination = ({
  page = 1,
  totalPages = 1,
  totalRecords = 0,
  limit = 10,
  onPageChange,
}) => {

  const start =
    totalRecords === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    totalRecords
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div>

        <p className="text-sm text-slate-500">

          Showing

          <span className="mx-1 font-semibold text-slate-800">

            {start}-{end}

          </span>

          of

          <span className="mx-1 font-semibold text-slate-800">

            {totalRecords}

          </span>

          Leads

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            bg-white
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <ChevronLeft size={18} />

        </button>

        {/* Current Page */}

        <div className="flex h-10 min-w-[42px] items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white">

          {page}

        </div>

        {/* Total Pages */}

        <span className="px-2 text-sm text-slate-500">

          of {totalPages}

        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            bg-white
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <ChevronRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default LeadPagination;