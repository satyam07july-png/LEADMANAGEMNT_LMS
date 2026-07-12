const PageHeader = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">

          {title}

        </h1>

        <p className="mt-2 text-slate-500">

          {subtitle}

        </p>

      </div>

      <div>

        {actions}

      </div>

    </div>
  );
};

export default PageHeader;