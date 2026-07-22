import {

ResponsiveContainer,

BarChart,

Bar,

XAxis,

YAxis,

CartesianGrid,

Tooltip

} from "recharts";

const RegionChart=({

data=[]

})=>{

if(!data.length){

return(

<div className="analytics-card">

<div className="analytics-card-header">

<h3>

Region Analytics

</h3>

<p>

No region data available.

</p>

</div>

</div>

)

}

return(

<div className="analytics-card">

<div className="analytics-card-header">
<h3>

Preferred Centre Analytics

</h3>

<p>

Lead distribution by preferred centre

</p>

</div>

<div className="analytics-chart">

<ResponsiveContainer
width="100%"
height={320}
>

<BarChart
layout="vertical"
data={data}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
type="number"
/>

<YAxis

dataKey="preferred_centre"

type="category"

/>

<Tooltip/>

<Bar

dataKey="leads"

radius={[0,8,8,0]}

/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

)

}

export default RegionChart;