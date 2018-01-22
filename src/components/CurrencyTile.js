import React from "react";
import { Link } from "react-router-dom";

import { formatCurrency } from "../utils/numberFormats";
import {
	Card,
	Row,
	Col,
	CurrencyTitles,
	CurrencySymbol,
	CurrencyPercent
} from "./Styled";

const CurrencyTile = props => {
	const priceCountry = props["price_" + props.currencyType.toLowerCase()] || 0;
	const price = formatCurrency(
		priceCountry,
		props.localeType,
		props.currencyType
	);
	let priceChange = `${props["percent_change_" + props.timeFormat]}%`;
	let negative = priceChange.indexOf("-") === -1 ? false : true;
	if (!negative) {
		priceChange = `+${priceChange}`;
	}
	return (
		<Card className="currency-tile">
			<Link to={{ pathname: "/crypto/" + props.id, state: { coin: props } }}>
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
			</Link>
		</Card>
	);
};

export default CurrencyTile;
