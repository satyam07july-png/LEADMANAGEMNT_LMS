import StatCard from "../../components/dashboard/StatCard";

const Dashboard = () => {

  const stats = [

    {
      title: "Total Campaigns",
      value: "12",
      growth: "+8% This Month",
      color: "text-green-600",
    },

    {
      title: "Total Leads",
      value: "1,245",
      growth: "+15% This Month",
      color: "text-green-600",
    },

    {
      title: "Today's Leads",
      value: "32",
      growth: "+6 Today",
      color: "text-blue-600",
    },

    {
      title: "Admissions",
      value: "284",
      growth: "+12 This Week",
      color: "text-green-600",
    },

    {
      title: "Students",
      value: "1,032",
      growth: "+24 This Month",
      color: "text-purple-600",
    },

    {
      title: "Employees",
      value: "18",
      growth: "2 New",
      color: "text-orange-600",
    },

  ];

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">

          Dashboard

        </h1>

        <p className="text-slate-500 mt-2">

          Welcome back! Here's an overview of your Admissions CRM.

        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {stats.map((item, index) => (

          <StatCard

            key={index}

            title={item.title}

            value={item.value}

            growth={item.growth}

            color={item.color}

          />

        ))}

      </div>

    </div>

  );
};

export default Dashboard;