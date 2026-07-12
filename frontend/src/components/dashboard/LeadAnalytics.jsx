import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import ChartCard from "./ChartCard";

const LeadAnalytics = ({
  data,
  loading,
}) => {

  if (loading) {
    return (
      <ChartCard title="Lead Analytics">
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </ChartCard>
    );
  }

  const analytics = data?.analytics || {};

  const chartData = [
    {
      name: "New",
      value: Number(analytics.new_leads || 0),
    },
    {
      name: "Contacted",
      value: Number(analytics.contacted || 0),
    },
    {
      name: "Qualified",
      value: Number(analytics.qualified || 0),
    },
    {
      name: "Follow Up",
      value: Number(analytics.follow_up || 0),
    },
    {
      name: "Admission",
      value: Number(analytics.admissions || 0),
    },
    {
      name: "Lost",
      value: Number(analytics.lost || 0),
    },
  ];

  return (
    <ChartCard title="Lead Analytics">

      <div className="mb-5">

        <p className="text-sm text-slate-500">

          Current lead pipeline overview

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={240}
      >

        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >

          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fill: "#64748b",
            }}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fill: "#64748b",
            }}
          />

          <Tooltip
            cursor={{
              fill: "#f8fafc",
            }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 8px 24px rgba(15,23,42,0.08)",
            }}
          />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            barSize={34}
          />

        </BarChart>

      </ResponsiveContainer>

    </ChartCard>
  );
};

export default LeadAnalytics;