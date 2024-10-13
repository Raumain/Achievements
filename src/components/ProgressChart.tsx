import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const ProgressChart = ({
	data,
}: { data: Array<{ name: string; result: number }> }) => {
	return (
		<div className="h-64">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3" />
					<XAxis dataKey="name" />
					<YAxis dataKey="result" />
					<Tooltip />
					<Area
						type="monotoneX"
						dataKey="result"
						stroke="#8884d8"
						fill="#8884d8"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ProgressChart;
