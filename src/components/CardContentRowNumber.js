import React from "react";

import { CardRow, CardRowTitle, CardRowResponse } from "./Styled";
import { formatNumber } from "../utils/numberFormats";

const CardContentRowNumber = ({ title, val, postFix, localeType }) => {
	let numVal = "";
	if (val) {
		numVal = formatNumber(val, localeType);
	}
	return (
		<CardRow>
			<CardRowTitle>{title}:</CardRowTitle>
			<CardRowResponse>{numVal + (postFix || "")}</CardRowResponse>
		</CardRow>
	);
};

export default CardContentRowNumber;
