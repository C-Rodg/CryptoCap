import React from "react";
import styled from "styled-components";

import { getTimeString } from "../utils/dateHelper";
import CurrencyTile from "./CurrencyTile";
import CardContentRow from "./CardContentRow";
import SettingsBtn from "./SettingsBtn";
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

const ContentHome = ({
	globalInfo,
	currencyList,
	timeFormat,
	onSwitchTime
}) => {
	const date = getTimeString(globalInfo.last_updated);
	return (
		<div className="content-home container">
			<NavTitle>
				CryptoCap <SettingsBtn />
			</NavTitle>
			<Row>
				{generateCurrencyColumn(currencyList, onSwitchTime, timeFormat)}
				<Col>
					<SubTitle className="m-b-9">Global Marketplace:</SubTitle>
					<Card className="marketplace-card">
						<CardContentRow
							title="Total Market-Cap"
							val={globalInfo.total_market_cap_usd}
							format="$0,0.00"
							isNumeral={true}
						/>

						<CardContentRow
							title="Volume in last 24hrs"
							val={globalInfo.total_24h_volume_usd}
							format="$0,0.00"
							isNumeral={true}
						/>

						<CardContentRow
							title="Bitcoin Dominance"
							val={globalInfo.bitcoin_percentage_of_market_cap}
							isNumeral={true}
							postFix="%"
						/>

						<CardContentRow
							title="Active Currencies"
							val={globalInfo.active_assets}
							format="0,0"
							isNumeral={true}
							postFix=" currencies"
						/>

						<CardContentRow
							title="Active Markets"
							val={globalInfo.active_markets}
							format="0,0"
							isNumeral={true}
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

const generateCurrencyColumn = (currencyList, onSwitchTime, timeFormat) => {
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
						<CurrencyTile key={curr.id} timeFormat={timeFormat} {...curr} />
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
