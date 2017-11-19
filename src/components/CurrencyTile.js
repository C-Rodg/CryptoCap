import React from "react";
const numeral = require("numeral");
import { Link } from "react-router-dom";

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
	let priceChange = `${props["percent_change_" + props.timeFormat]}%`;
	let negative = priceChange.indexOf("-") === -1 ? false : true;
	if (!negative) {
		priceChange = `+${priceChange}`;
	}
	return (
		<Card className="currency-tile">
			<Row>
				<Col>
					<Link to={"/crypto/" + props.id}>
						<CurrencyTitles>{props.name}</CurrencyTitles>
						<CurrencySymbol>{props.symbol}</CurrencySymbol>
					</Link>
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
