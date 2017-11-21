import React from "react";
const numeral = require("numeral");
import styled from "styled-components";

import CurrencyTile from "./CurrencyTile";
import CardContentRow from "./CardContentRow";
import {
	NavTitle,
	SubTitleContainer,
	TimeSwitchContainer,
	SubTitle,
	Row,
	Col,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse,
	ScrollContent
} from "./Styled";

const ContentHome = ({
	globalInfo,
	currencyList,
	timeFormat,
	onSwitchTime
}) => {
	return (
		<div className="content-home container">
			<NavTitle>Coinbar</NavTitle>
			<Row>
				<Col>
					<SubTitleContainer>
						<SubTitle>My Currencies:</SubTitle>
						<TimeSwitchContainer>
							<a
								className={timeFormat === "1h" ? "active" : ""}
								onClick={() => onSwitchTime("1h")}
							>
								1hr
							</a>
							<a
								onClick={() => onSwitchTime("24h")}
								className={timeFormat === "24h" ? "active" : ""}
							>
								24hr
							</a>
							<a
								onClick={() => onSwitchTime("7d")}
								className={timeFormat === "7d" ? "active" : ""}
							>
								7d
							</a>
						</TimeSwitchContainer>
					</SubTitleContainer>
					<ScrollContent>
						{currencyList.map(curr => (
							<CurrencyTile key={curr.id} timeFormat={timeFormat} {...curr} />
						))}
					</ScrollContent>
				</Col>
				<Col>
					<SubTitle>Global Marketplace:</SubTitle>
					<Card className="marketplace-card">
						<CardContentRow
							title="Total Market-Cap"
							val={globalInfo.total_market_cap_usd}
							format="$0,0.00"
							isNumeral={true}
						/>

						<CardContentRow
							title="Volume in last 24hrs"
							val={globalInfo.total_24h_volume_usd}
							format="$0,0.00"
							isNumeral={true}
						/>

						<CardContentRow
							title="Bitcoin Dominance"
							val={globalInfo.bitcoin_percentage_of_market_cap}
							isNumeral={true}
							postFix="%"
						/>

						<CardContentRow
							title="Active Currencies"
							val={globalInfo.active_assets}
							format="0,0"
							isNumeral={true}
							postFix=" currencies"
						/>

						<CardContentRow
							title="Active Markets"
							val={globalInfo.active_markets}
							format="0,0"
							isNumeral={true}
							postFix=" markets"
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ContentHome;
