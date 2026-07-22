const TABS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "analytics",
    label: "Analytics",
  },
  {
    id: "regions",
    label: "Regions",
  },
  {
    id: "recent-leads",
    label: "Recent Leads",
  },
];

const DrawerTabs = ({
  activeTab,
  setActiveTab,
}) => {

  return (

    <div className="drawer-tabs">

      {

        TABS.map((tab) => (

          <button
            key={tab.id}
            className={
              activeTab === tab.id
                ? "drawer-tab active"
                : "drawer-tab"
            }
            onClick={() =>
              setActiveTab(tab.id)
            }
          >

            {tab.label}

          </button>

        ))

      }

    </div>

  );

};

export default DrawerTabs;