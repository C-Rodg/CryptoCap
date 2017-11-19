import React from "react";
const numeral = require("numeral");

import {
	Card,
	Row,
	Col,
	CurrencyTitles,
	CurrencySymbol,
	CurrencyPercent
} from "./Styled";

const CurrencyTile = props => {
	const price = numeral(props.price_usd).format("$0,0.00");
	const priceChange = `${props["percent_change_" + props.timeFormat]}%`;
	let negative = priceChange.indexOf("-") === -1 ? false : true;
	return (
		<Card className="currency-tile">
			<Row>
				<Col>
					<CurrencyTitles>{props.name}</CurrencyTitles>
					<CurrencySymbol>{props.symbol}</CurrencySymbol>
				</Col>
				<Col right>
					<CurrencyTitles>{price}</CurrencyTitles>
					<CurrencyPercent negative={negative}>{priceChange}</CurrencyPercent>
				</Col>
			</Row>
		</Card>
	);
};

export default CurrencyTile;
