import logo from "../../../assets/logo/logo.png";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

        <img
          src={logo}
          alt="IEM LMS"
          className="h-9 w-9 object-contain"
        />

      </div>

      <div>

       <h2 className="text-lg font-bold text-slate-900">

IEM LMS

</h2>

<p className="text-xs text-slate-500">

Education CRM

</p>

      </div>

    </div>
  );
};

export default SidebarHeader;