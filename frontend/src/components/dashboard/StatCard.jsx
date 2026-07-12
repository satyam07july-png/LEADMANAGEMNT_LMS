const StatCard = ({
  title,
  value = 0,
  today = 0,
  growth = 0,
  icon: Icon,
  color = "bg-blue-600",
}) => {

  const formattedValue = Number(value).toLocaleString("en-IN");

  const isPositive = Number(growth) >= 0;

  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">

            {formattedValue}

          </h2>

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${color}
          `}
        >
          {Icon && (
            <Icon
              size={26}
              className="text-white"
            />
          )}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

        <span className="text-sm text-slate-500">

          {today} Today

        </span>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(Number(growth))}%
        </span>

      </div>

    </article>
  );
};

export default StatCard;