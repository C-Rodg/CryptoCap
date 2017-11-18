import React from "react";
const numeral = require("numeral");

import CurrencyTile from "./CurrencyTile";

const ContentHome = ({ globalInfo, currencyList, timeFormat }) => {
	return (
		<div className="content-home container">
			<div>Coinbar</div>
			<div>
				<div>My Currencies</div>
				<div>
					{currencyList.map(curr => (
						<CurrencyTile key={curr.id} timeFormat={timeFormat} {...curr} />
					))}
				</div>
			</div>
			<div>
				<div>Global Marketplace</div>
				<div className="marketplace-card">
					<div>
						Total Market-Cap:{" "}
						{numeral(globalInfo.total_market_cap_usd).format("$0,0.00")}
					</div>
					<div>
						Volume in last 24hrs:{" "}
						{numeral(globalInfo.total_24h_volume_usd).format("$0,0.00")}
					</div>
					<div>
						Bitcoin Dominance: {globalInfo.bitcoin_percentage_of_market_cap}%
					</div>
					<div>
						Active Currencies: {numeral(globalInfo.active_assets).format("0,0")}
					</div>
					<div>
						Active Markets: {numeral(globalInfo.active_markets).format("0,0")}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentHome;
