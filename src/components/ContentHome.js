import React from "react";
const numeral = require("numeral");
import styled from "styled-components";

import CurrencyTile from "./CurrencyTile";
import {
	NavTitle,
	SubTitle,
	Row,
	Col,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse,
	ScrollContent
} from "./Styled";

const ContentHome = ({ globalInfo, currencyList, timeFormat }) => {
	return (
		<div className="content-home container">
			<NavTitle>Coinbar</NavTitle>
			<Row>
				<Col>
					<SubTitle>My Currencies:</SubTitle>
					<ScrollContent>
						{currencyList.map(curr => (
							<CurrencyTile key={curr.id} timeFormat={timeFormat} {...curr} />
						))}
					</ScrollContent>
				</Col>
				<Col>
					<SubTitle>Global Marketplace:</SubTitle>
					<Card className="marketplace-card">
						<CardRow>
							<CardRowTitle>Total Market-Cap:</CardRowTitle>
							<CardRowResponse>
								{numeral(globalInfo.total_market_cap_usd).format("$0,0.00")}
							</CardRowResponse>
						</CardRow>
						<CardRow>
							<CardRowTitle>Volume in last 24hrs:</CardRowTitle>
							<CardRowResponse>
								{numeral(globalInfo.total_24h_volume_usd).format("$0,0.00")}
							</CardRowResponse>
						</CardRow>
						<CardRow>
							<CardRowTitle>Bitcoin Dominance:</CardRowTitle>{" "}
							<CardRowResponse>
								{globalInfo.bitcoin_percentage_of_market_cap}%
							</CardRowResponse>
						</CardRow>
						<CardRow>
							<CardRowTitle>Active Currencies:</CardRowTitle>
							{numeral(globalInfo.active_assets).format("0,0")} currencies
						</CardRow>
						<CardRow>
							<CardRowTitle>Active Markets:</CardRowTitle>{" "}
							{numeral(globalInfo.active_markets).format("0,0")} markets
						</CardRow>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ContentHome;
