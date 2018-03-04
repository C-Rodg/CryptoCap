import React from "react";
import styled from "styled-components";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip
} from "recharts";

import { dateTickerFormat } from "../../utils/dateHelper";
import { colors } from "../../styles/colors";
import { SubTitle } from "../Common/SubTitle";

// Helper - Format y axis
const yaxisTickFormat = format => t => {
	if (format === "price") {
		return t.toFixed(2);
	}
	return t;
};

const StyledTooltip = styled.div`
	background-color: ${colors.cardBackground};
	border-radius: 6px;
	padding: 10px;

	> div {
		line-height: 1.5;
	}

	.sub {
		font-size: 0.9rem;
		color: ${colors.cardText};
	}
`;

const CoinGraph = ({ isLoading, data, selectedTimeline, selectedData }) => {
	if (isLoading) {
		return <SubTitle>Loading...</SubTitle>;
	}
	if (!data) {
		return <SubTitle>Sorry, no graph data available...</SubTitle>;
	}

	return (
		<ResponsiveContainer width="100%" height={260}>
			<LineChart
				data={data}
				margin={{ top: 5, right: 70, left: 90, bottom: 5 }}
			>
				<XAxis
					dataKey="time"
					type="number"
					allowDataOverflow={true}
					domain={["dataMin", "dataMax"]}
					tickFormatter={dateTickerFormat}
					padding={{ left: 2 }}
				/>
				<YAxis
					type="number"
					dataKey="value"
					domain={["dataMin", "dataMax"]}
					padding={{ bottom: 30 }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Line type="monotone" name="Graph Data" dataKey="value" dot={false} />
			</LineChart>
		</ResponsiveContainer>
	);
};

// Tooltip Component
const CustomTooltip = props => {
	const { active, payload, label } = props;
	console.log(payload);
	if (active && payload && payload[0].payload) {
		const pay = payload[0].payload;
		return (
			<StyledTooltip>
				<div>{pay.type}:</div>
				<div className="sub">Time: {dateTickerFormat(pay.time)}</div>
				<div className="sub">Value: {pay.value}</div>
			</StyledTooltip>
		);
	}
	return null;
};

export default CoinGraph;
