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
							<CardRow>
								<CardRowTitle>Current Price (USD):</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Current Price (BTC):</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_btc).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Percent Change - 1 hour:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Percent Change - 24 hours:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Percent Change - 7 days:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Volume in last 24 hours (USD):</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Market Cap (USD):</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Cryptocurrency Rank:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Available Supply:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Total Supply:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
							<CardRow>
								<CardRowTitle>Max Supply:</CardRowTitle>
								<CardRowResponse>
									{numeral(coin.price_usd).format("$0,0.00")}
								</CardRowResponse>
							</CardRow>
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
