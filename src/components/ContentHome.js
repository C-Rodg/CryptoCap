import React from "react";
import styled from "styled-components";

import { getTimeString } from "../utils/dateHelper";
import CurrencyTile from "./CurrencyTile";
import SettingsBtn from "./SettingsBtn";
import ExitBtn from "./ExitBtn";
import {
	NavTitle,
	SubTitleContainer,
	TimeSwitchContainer,
	SubTitle,
	Row,
	Col,
	Card,
	CardRow,
	CardRowTitle,
	CardRowResponse,
	ScrollContent
} from "./Styled";
import CardContentRowCurrency from "./CardContentRowCurrency";
import CardContentRowNumber from "./CardContentRowNumber";
import CardContentRowPercent from "./CardContentRowPercent";

const ContentHome = ({
	globalInfo,
	currencyList,
	timeFormat,
	onSwitchTime,
	onCloseApp,
	currencyType,
	localeType
}) => {
	const date = getTimeString(globalInfo.last_updated);
	const lowerCurrency = currencyType.toLowerCase();

	const globalMarketCap = globalInfo["total_market_cap_" + lowerCurrency] || 0;
	const global24Volume = globalInfo["total_24h_volume_" + lowerCurrency] || 0;

	return (
		<div className="content-home container">
			<NavTitle>
				CryptoCap <ExitBtn onCloseApp={onCloseApp} /> <SettingsBtn />
			</NavTitle>
			<Row>
				{generateCurrencyColumn(
					currencyList,
					onSwitchTime,
					timeFormat,
					currencyType,
					localeType
				)}
				<Col>
					<SubTitle className="m-b-9">Global Marketplace:</SubTitle>
					<Card className="marketplace-card">
						<CardContentRowCurrency
							title="Total Market Cap"
							val={globalMarketCap}
							currencyType={currencyType}
							localeType={localeType}
						/>
						<CardContentRowCurrency
							title="Volume in last 24hrs"
							val={global24Volume}
							currencyType={currencyType}
							localeType={localeType}
						/>
						<CardContentRowPercent
							title="Bitcoin Dominance"
							val={globalInfo.bitcoin_percentage_of_market_cap}
							localeType={localeType}
							disableStyles={true}
						/>

						<CardContentRowNumber
							title="Active Assets"
							val={globalInfo.active_assets}
							localeType={localeType}
							postFix=" currencies"
						/>

						<CardContentRowNumber
							title="Active Currencies"
							val={globalInfo.active_currencies}
							localeType={localeType}
							postFix=" currencies"
						/>

						<CardContentRowNumber
							title="Active Markets"
							val={globalInfo.active_markets}
							localeType={localeType}
							postFix=" markets"
						/>
					</Card>
					<div className="m-10">
						<SubTitle>Last Updated:</SubTitle>
						<SubTitle>{date}</SubTitle>
					</div>
				</Col>
			</Row>
		</div>
	);
};

const generateCurrencyColumn = (
	currencyList,
	onSwitchTime,
	timeFormat,
	currencyType,
	localeType
) => {
	if (currencyList && currencyList.length > 0) {
		return (
			<Col>
				<SubTitleContainer>
					<SubTitle>My Currencies:</SubTitle>
					<TimeSwitchContainer>
						<a
							className={timeFormat === "1h" ? "active" : ""}
							onClick={() => onSwitchTime("1h")}
						>
							1hr
						</a>
						<a
							onClick={() => onSwitchTime("24h")}
							className={timeFormat === "24h" ? "active" : ""}
						>
							24hr
						</a>
						<a
							onClick={() => onSwitchTime("7d")}
							className={timeFormat === "7d" ? "active" : ""}
						>
							7d
						</a>
					</TimeSwitchContainer>
				</SubTitleContainer>
				<ScrollContent>
					{currencyList.map(curr => (
						<CurrencyTile
							{...curr}
							key={curr.id}
							timeFormat={timeFormat}
							currencyType={currencyType}
							localeType={localeType}
						/>
					))}
				</ScrollContent>
			</Col>
		);
	} else {
		return (
			<Col>
				<SubTitle>-No Saved Currencies-</SubTitle>
			</Col>
		);
	}
};

export default ContentHome;
