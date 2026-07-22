import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb", // New
  "#f59e0b", // Pending
  "#22c55e", // Confirmed
  "#ef4444", // Rejected
];

const LeadStatusPie = ({ overview = {} }) => {

  const data = [
    {
      name: "New",
      value: Number(overview.new_leads || 0),
    },
    {
      name: "Pending",
      value: Number(overview.pending_leads || 0),
    },
    {
      name: "Confirmed",
      value: Number(overview.confirmed_leads || 0),
    },
    {
      name: "Rejected",
      value: Number(overview.rejected_leads || 0),
    },
  ].filter(item => item.value > 0);

  if (!data.length) {
    return (
      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Lead Status Distribution</h3>
          <p>No lead status data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-card">

      <div className="analytics-card-header">
        <h3>Lead Status Distribution</h3>
        <p>Current lead status breakdown</p>
      </div>

      <div className="analytics-chart">

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );

};

export default LeadStatusPie;