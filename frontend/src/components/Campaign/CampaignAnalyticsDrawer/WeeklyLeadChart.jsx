import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeeklyLeadChart = ({ data = [] }) => {

  if (!data.length) {
    return (
      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Weekly Leads</h3>
          <p>No weekly data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-card">

      <div className="analytics-card-header">

        <h3>Weekly Leads</h3>

        <p>Current month lead generation</p>

      </div>

      <div className="analytics-chart">

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="week"
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip />

            <Bar
              dataKey="leads"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );

};

export default WeeklyLeadChart;