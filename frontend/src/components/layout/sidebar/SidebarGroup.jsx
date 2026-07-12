import SidebarItem from "./SidebarItem";

const SidebarGroup = ({ title, items }) => {
  return (
    <section className="mt-7 first:mt-0">

      {/* Group Title */}

      <h3 className="mb-4 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">

        {title}

      </h3>

      {/* Navigation */}

      <nav className="space-y-2">

        {items.map((item) => (

          <SidebarItem
            key={item.path}
            item={item}
          />

        ))}

      </nav>

    </section>
  );
};

export default SidebarGroup;