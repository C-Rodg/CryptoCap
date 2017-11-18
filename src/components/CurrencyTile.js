import React from "react";
const numeral = require("numeral");

const CurrencyTile = props => {
	const price = numeral(props.price_usd).format("$0,0.00");
	const priceChange = `${props["percent_change_" + props.timeFormat]}%`;
	return (
		<div className="currency-tile">
			<div className="left-col">
				<div>{props.name}</div>
				<div>{props.symbol}</div>
			</div>
			<div className="right-col">
				<div>{price}</div>
				<div>{priceChange}</div>
			</div>
		</div>
	);
};

export default CurrencyTile;
