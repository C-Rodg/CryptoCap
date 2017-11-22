import React from "react";

import BackBtn from "./BackBtn";
import {
	Row,
	Col,
	NavTitle,
	SubTitle,
	SubTitleContainer,
	TimeSwitchContainer
} from "./Styled";

// Time switch, search and add or remove currencies
const ContentSettings = ({ currencyList, timeFormat }) => {
	return (
		<div className="content-settings container">
			<NavTitle>
				Settings<BackBtn />
			</NavTitle>
			<Row>
				<Col>
					<SubTitle>Currencies:</SubTitle>
				</Col>
				<Col>
					<SubTitleContainer>
						<SubTitle>Default Time Format:</SubTitle>
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
				</Col>
			</Row>
		</div>
	);
};

export default ContentSettings;
