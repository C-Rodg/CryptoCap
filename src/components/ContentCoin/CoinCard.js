import React from "react";
import { Card, CardRow, CardRowTitle, CardRowResponse } from "../Common/Card";
import NumberBasic from "../Common/NumberBasic";
import NumberCurrency from "../Common/NumberCurrency";
import NumberPercent from "../Common/NumberPercent";
import { ordinalSuffixOf } from "../../utils/dateHelper";

const CoinCard = ({
	exchangeRates,
	selectedLocale,
	selectedFiatCurrency,
	price = 0,
	priceBTC = 0,
	rank,
	change24 = 0,
	vwap24 = price,
	supply = 0,
	volume = 0,
	marketCap = 0
}) => {
	return (
		<Card>
			<CardRow>
				<CardRowTitle>Current Price ({selectedFiatCurrency}):</CardRowTitle>
				<CardRowResponse>
					<NumberCurrency
						val={price}
						type={selectedFiatCurrency}
						locale={selectedLocale}
						exchangeRates={exchangeRates}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Current Price (BTC):</CardRowTitle>
				<CardRowResponse>
					<NumberBasic val={priceBTC} locale={selectedLocale} />
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Percent Change (24hrs):</CardRowTitle>
				<CardRowResponse>
					<NumberPercent
						val={change24}
						locale={selectedLocale}
						showColors={true}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Market Cap ({selectedFiatCurrency}):</CardRowTitle>
				<CardRowResponse>
					<NumberCurrency
						val={marketCap}
						type={selectedFiatCurrency}
						locale={selectedLocale}
						exchangeRates={exchangeRates}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Volume Weighted Price (24hrs):</CardRowTitle>
				<CardRowResponse>
					<NumberCurrency
						val={vwap24}
						type={selectedFiatCurrency}
						locale={selectedLocale}
						exchangeRates={exchangeRates}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Volume:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic val={volume} locale={selectedLocale} />
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Supply:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic val={supply} locale={selectedLocale} /> coins
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Cryptocurrency Rank:</CardRowTitle>
				<CardRowResponse>{ordinalSuffixOf(rank)}</CardRowResponse>
			</CardRow>
		</Card>
	);
};

export default CoinCard;
