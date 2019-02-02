// Libraries
import React from 'react';

// Styled Components
import { Card, CardRow, CardRowTitle, CardRowResponse } from '../Common/Card';

// Components
import NumberBasic from '../Common/NumberBasic';
import NumberCurrency from '../Common/NumberCurrency';
import NumberPercent from '../Common/NumberPercent';

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
						val={globalData.quote.USD.total_market_cap}
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
						val={globalData.quote.USD.total_volume_24h}
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
						val={globalData.btc_dominance}
						locale={selectedLocale}
						showColors={false}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Ethereum Dominance:</CardRowTitle>
				<CardRowResponse>
					<NumberPercent
						val={globalData.eth_dominance}
						locale={selectedLocale}
						showColors={false}
					/>
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Currencies:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic
						val={globalData.active_cryptocurrencies}
						locale={selectedLocale}
					/>{' '}
					currencies
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Markets:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic
						val={globalData.active_exchanges}
						locale={selectedLocale}
					/>{' '}
					markets
				</CardRowResponse>
			</CardRow>
			<CardRow>
				<CardRowTitle>Active Market Pairs:</CardRowTitle>
				<CardRowResponse>
					<NumberBasic
						val={globalData.active_market_pairs}
						locale={selectedLocale}
					/>{' '}
					pairs
				</CardRowResponse>
			</CardRow>
		</Card>
	);
};

export default GlobalCard;
