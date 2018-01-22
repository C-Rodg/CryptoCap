import React from "react";
const numeral = require("numeral");
import { Link } from "react-router-dom";

import { getTimeString } from "../utils/dateHelper";
import {
	NavTitle,
	Row,
	Col,
	SubTitleContainer,
	SubTitle,
	ScrollContent,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse,
	ToggleTitle
} from "./Styled";

import BackBtn from "./BackBtn";
import CardContentRowNumber from "./CardContentRowNumber";
import CardContentRowCurrency from "./CardContentRowCurrency";
import CardContentRowPercent from "./CardContentRowPercent";

const ContentCoin = props => {
	// No coin selected
	if (!props.location.state) {
		return (
			<div className="content-coin container">
				<NavTitle>
					CryptoCap <BackBtn />
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

	const date = getTimeString(coin.last_updated);

	// Determine if this coin is saved
	let isSelected = true;
	if (props.savedIds.indexOf(coin.id) === -1) {
		isSelected = false;
	}

	// Determine if there is a price alert
	let hasAlert = false,
		alertPrice = "";
	if (props.priceAlerts && props.priceAlerts.length > 0) {
		const thisAlert = props.priceAlerts.find(a => a.id === coin.id);
		if (thisAlert) {
			hasAlert = true;
			alertPrice = numeral(thisAlert.price).format("$0,0");
		}
	}

	return (
		<div className="content-coin container">
			<NavTitle>
				<span className={["currency-icon", `i-${coin.id}`].join(" ")} />
				{coin.name}

				<BackBtn />
			</NavTitle>
			<Row>
				<Col>
					<SubTitle className="m-b-9">{coin.symbol}</SubTitle>
					<ScrollContent>
						<Card>
							<CardContentRowCurrency
								title={`Current Price (${coin.currencyType})`}
								val={coin["price_" + coin.currencyType.toLowerCase()] || 0}
								localeType={coin.localeType}
								currencyType={coin.currencyType}
							/>
							<CardContentRowNumber
								title="Current Price (BTC)"
								val={coin.price_btc}
								localeType={coin.localeType}
								postFix=" coins"
							/>
							<CardContentRowPercent
								title="Percent Change - 1 hour"
								val={coin.percent_change_1h}
								localeType={coin.localeType}
								postFix="%"
							/>
							<CardContentRowPercent
								title="Percent Change - 24 hours"
								val={coin.percent_change_24h}
								localeType={coin.localeType}
								postFix="%"
							/>
							<CardContentRowPercent
								title="Percent Change - 7 days"
								val={coin.percent_change_7d}
								localeType={coin.localeType}
								postFix="%"
							/>
							<CardContentRowCurrency
								title="Volume in last 24 hours"
								val={coin["24h_volume_" + coin.currencyType.toLowerCase()] || 0}
								localeType={coin.localeType}
								currencyType={coin.currencyType}
							/>
							<CardContentRowCurrency
								title={`Market Cap (${coin.currencyType})`}
								val={coin["market_cap_" + coin.currencyType.toLowerCase()] || 0}
								localeType={coin.localeType}
								currencyType={coin.currencyType}
							/>
							<CardContentRowNumber
								title="Cryptocurrency Rank"
								val={coin.rank}
								localeType={coin.localeType}
							/>
							<CardContentRowNumber
								title="Available Supply"
								val={coin.available_supply}
								localeType={coin.localeType}
								postFix=" coins"
							/>
							<CardContentRowNumber
								title="Total Supply"
								val={coin.total_supply}
								localeType={coin.localeType}
								postFix=" coins"
							/>
							<CardContentRowNumber
								title="Max Supply"
								val={coin.max_supply}
								localeType={coin.localeType}
								postFix=" coins"
							/>
						</Card>
					</ScrollContent>
				</Col>
				<div>
					<SubTitle className="m-b-6">Last Updated:</SubTitle>
					<SubTitle>{date}</SubTitle>
					{hasAlert ? (
						<ToggleTitle
							isSelected={true}
							onClick={() => props.onRemoveAlert(coin.id)}
						>{`-Remove Alert of <${alertPrice}-`}</ToggleTitle>
					) : (
						<Link to={{ pathname: "/alert/" + coin.id, state: { coin } }}>
							<ToggleTitle isSelected={false}>-Create Price Alert-</ToggleTitle>
						</Link>
					)}
					<ToggleTitle
						isSelected={isSelected}
						onClick={() => props.onToggleSavedId(coin.id)}
					>
						{isSelected ? "-Remove from Saved Coins-" : "-Add to Saved Coins-"}
					</ToggleTitle>
				</div>
			</Row>
		</div>
	);
};

export default ContentCoin;
