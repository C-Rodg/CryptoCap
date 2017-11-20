import React from "react";
const numeral = require("numeral");

import {
	NavTitle,
	Row,
	Col,
	SubTitleContainer,
	SubTitle,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse
} from "./Styled";

const ContentCoin = props => {
	const { coin } = props.location.state;

	return (
		<div className="content-coin container">
			<NavTitle>{coin.name}</NavTitle>
			<Row>
				<Col>
					<SubTitle>{coin.symbol}</SubTitle>
					<Card>
						<CardRow>
							<CardRowTitle>Current Price:</CardRowTitle>
							<CardRowResponse>
								{numeral(coin.price_usd).format("$0,0.00")}
							</CardRowResponse>
						</CardRow>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ContentCoin;
