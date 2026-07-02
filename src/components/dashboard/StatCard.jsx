const StatCard = ({
  title,
  value,
  growth,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      <div className="flex flex-col gap-4">

        <div>

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">

            {value}

          </h2>

        </div>

        <div>

          <span
            className={`text-sm font-semibold ${color}`}
          >
            {growth}
          </span>

        </div>

      </div>

    </div>
  );
};

export default StatCard;