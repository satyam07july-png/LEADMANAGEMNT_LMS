import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const MonthlyLeadChart = ({ data = [] }) => {

  if (!data.length) {
    return (
      <div className="analytics-card">

        <div className="analytics-card-header">

          <h3>Monthly Lead Trend</h3>

          <p>No monthly lead data available.</p>

        </div>

      </div>
    );
  }

  return (

    <div className="analytics-card">

      <div className="analytics-card-header">

        <h3>

          Monthly Lead Trend

        </h3>

        <p>

          Leads generated from this campaign every month

        </p>

      </div>

      <div className="analytics-chart">

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <AreaChart
            data={data}
          >

            <defs>

              <linearGradient
                id="leadGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#leadGradient)"
            />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r:5
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default MonthlyLeadChart;