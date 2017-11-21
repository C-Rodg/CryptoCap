import React from "react";
const numeral = require("numeral");

import {
	NavTitle,
	Row,
	Col,
	SubTitleContainer,
	SubTitle,
	ScrollContent,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse
} from "./Styled";

import CardContentRow from "./CardContentRow";
import BackBtn from "./BackBtn";

const ContentCoin = props => {
	// No coin selected
	if (!props.location.state) {
		return (
			<div className="content-coin container">
				<NavTitle>
					Coinbar <BackBtn />
				</NavTitle>
				<Row>
					<Col>
						<SubTitle>-no currency selected-</SubTitle>
					</Col>
				</Row>
			</div>
		);
	}
	const { coin } = props.location.state;

	return (
		<div className="content-coin container">
			<NavTitle>
				{coin.name}
				<BackBtn />
			</NavTitle>
			<Row>
				<Col>
					<SubTitle>{coin.symbol}</SubTitle>
					<ScrollContent>
						<Card>
							<CardContentRow
								title="Current Price (USD)"
								val={coin.price_usd}
								format="$0,0.00"
								isNumeral={true}
							/>
							<CardContentRow
								title="Current Price (BTC)"
								val={coin.price_btc}
								isNumeral={false}
								postFix=" coins"
							/>
							<CardContentRow
								title="Percent Change - 1 hour"
								val={coin.percent_change_1h}
								isNumeral={false}
								postFix="%"
								isPercent={true}
							/>
							<CardContentRow
								title="Percent Change - 24 hours"
								val={coin.percent_change_24h}
								isNumeral={false}
								postFix="%"
								isPercent={true}
							/>
							<CardContentRow
								title="Percent Change - 7 days"
								val={coin.percent_change_7d}
								isNumeral={false}
								postFix="%"
								isPercent={true}
							/>
							<CardContentRow
								title="Volume in last 24 hours"
								val={coin["24h_volume_usd"]}
								format="$0,0.00"
								isNumeral={true}
							/>
							<CardContentRow
								title="Market Cap (USD)"
								val={coin.market_cap_usd}
								format="$0,0.00"
								isNumeral={true}
							/>
							<CardContentRow
								title="Cryptocurrency Rank"
								val={coin.rank}
								format="0o"
								isNumeral={true}
							/>
							<CardContentRow
								title="Available Supply"
								val={coin.available_supply}
								format="0,0"
								isNumeral={true}
								postFix=" coins"
							/>
							<CardContentRow
								title="Total Supply"
								val={coin.total_supply}
								format="0,0"
								isNumeral={true}
								postFix=" coins"
							/>
							<CardContentRow
								title="Max Supply"
								val={coin.max_supply}
								format="0,0"
								isNumeral={true}
								postFix=" coins"
							/>
						</Card>
					</ScrollContent>
				</Col>
			</Row>
		</div>
	);
};

export default ContentCoin;

// price in USD
// price in bitcoin
// percent change 1hr
// percent change 7d
// percent change 24hr
// 24 hour volume USD
// market cap usd
// rank
// Available supply
// total supply
// max supply

// last updated
