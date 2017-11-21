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

import BackBtn from "./BackBtn";

const ContentCoin = props => {
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
