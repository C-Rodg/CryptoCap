import React from "react";

import { CardRow, CardRowTitle, CardRowResponse } from "./Styled";
import { formatPercent } from "../utils/numberFormats";

const CardContentRowPercent = ({
	title,
	val,
	localeType,
	disableStyles,
	postFix
}) => {
	let percentVal = "";
	let percentClass = "";
	if (val) {
		percentVal = formatPercent(val, localeType);
		if (!disableStyles) {
			percentClass = String(val).indexOf("-") > -1 ? "error" : "success";
			if (percentClass === "success") {
				percentVal = "+" + percentVal;
			}
		}
		if (postFix) {
			percentVal = val + postFix;
		}
	}

	return (
		<CardRow>
			<CardRowTitle>{title}:</CardRowTitle>
			<CardRowResponse className={percentClass}>{percentVal}</CardRowResponse>
		</CardRow>
	);
};

export default CardContentRowPercent;
