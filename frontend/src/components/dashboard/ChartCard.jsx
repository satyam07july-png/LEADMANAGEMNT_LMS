const ChartCard = ({ title, children }) => {
  return (
    <div
      className="
        h-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-900">

          {title}

        </h2>

      </div>

      {/* Body */}

      <div className="p-6">

        {children}

      </div>

    </div>
  );
};

export default ChartCard;