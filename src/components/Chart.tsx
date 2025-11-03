import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Chart() {
	const [options] = useState({
		chart: {
			type: "line",
    },
		title: {
			text: "Training Progress",
		},
		xAxis: {
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		},
		yAxis: {
			title: {
				text: "Weights (kg)",
			},
		},
		series: [
			{
				name: "Weight",
				data: [0, 1, 5, 10, 15, 20],
			},
		],
	});

	return (
		<div className="p-4">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}
