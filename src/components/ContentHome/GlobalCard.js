// Libraries
import React from "react";

// Styled Components
import { Card, CardRow, CardRowTitle, CardRowResponse } from "../Common/Card";

// Components
import NumberBasic from "../Common/NumberBasic";
import NumberCurrency from "../Common/NumberCurrency";
import NumberPercent from "../Common/NumberPercent";

const GlobalCard = ({
	exchangeRates,
	selectedFiatCurrency,
	selectedLocale,
	globalData
}) => {
	return (
		<Card>
			<CardRow>
				<CardRowTitle>Total Market Cap:</CardRowTitle>
				<CardRowResponse>
					<NumberCurrency
						val={globalData.total_market_cap_usd}
						type={selectedFiatCurrency}
						exchangeRates={exchangeRates}
						locale={selectedLocale}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Volume in last 24hrs:</CardRowTitle>
				<CardRowResponse>
					<NumberCurrency
						val={globalData.total_24h_volume_usd}
						type={selectedFiatCurrency}
						exchangeRates={exchangeRates}
						locale={selectedLocale}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Bitcoin Dominance:</CardRowTitle>
				<CardRowResponse>
					<NumberPercent
						val={globalData.bitcoin_percentage_of_market_cap}
						locale={selectedLocale}
						showColors={false}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Assets:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic val={globalData.active_assets} locale={selectedLocale} />{" "}
					assets
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Currencies:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic
						val={globalData.active_currencies}
						locale={selectedLocale}
					/>{" "}
					currencies
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Markets:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic
						val={globalData.active_markets}
						locale={selectedLocale}
					/>{" "}
					markets
				</CardRowResponse>
			</CardRow>
		</Card>
	);
};

export default GlobalCard;
