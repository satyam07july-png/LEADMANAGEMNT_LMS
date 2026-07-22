import "./LeadStatusChart.css";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EF4444",
];

const LeadStatusChart = ({ data = [] }) => {

    return (

        <div className="lead-chart-card">

            <div className="lead-chart-header">

                <h3>

                    Lead Status

                </h3>

            </div>

            {
                data.length === 0 ? (

                    <div className="chart-empty">

                        No Lead Status Available

                    </div>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="total"
                                nameKey="status"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={3}
                            >

                                {

                                    data.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                )
            }

        </div>

    );

};

export default LeadStatusChart;