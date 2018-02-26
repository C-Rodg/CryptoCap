import React from "react";
import {
	Charts,
	ChartContainer,
	ChartRow,
	YAxis,
	LineChart,
	Resizable
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

const style = {
	value: {
		stroke: "#a02c2c",
		opacity: 0.2
	}
};

const xAxisFormat = {
	"1day": "%I %p",
	"7day": "%a %d",
	"30day": "",
	"90day": "",
	"180day": "",
	"365day": "%b '%y"
};

const newPoints = [
	[1519419270000, 12],
	[1519423166000, 10],
	[1519426168000, 24],
	[1519429168000, 13],
	[1519503868000, 20]
];

const CoinGraph = ({ data, selectedTimeline }) => {
	if (!data) {
		return <div>No graph data...</div>;
	}

	const series = new TimeSeries({
		name: "CoinGraph",
		columns: ["time", "value"],
		points: data
	});
	console.log(data.length);
	console.log(data[0]);
	console.log(data[data.length - 1]);
	console.log(series);
	console.log(series.range());
	console.log(series.min());
	console.log(series.max());
	console.log(series.range().begin());
	console.log(series.range().end());
	console.log(series.timerange());

	return (
		<Resizable>
			<ChartContainer
				utc={true}
				timeRange={series.range()}
				maxTime={new Date(1519160067000)}
				minTime={series.range().begin()}
				format="%a %d %I %p"
			>
				<ChartRow height="200">
					<YAxis
						id="y"
						label="Price"
						min={series.min()}
						max={series.max()}
						width="80"
					/>
					<Charts>
						<LineChart
							axis="y"
							series={series}
							style={style}
							columns={["value"]}
						/>
					</Charts>
				</ChartRow>
			</ChartContainer>
		</Resizable>
	);
};

export default CoinGraph;
