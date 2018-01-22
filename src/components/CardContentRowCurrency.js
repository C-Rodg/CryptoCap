import React from "react";

import { formatCurrency } from "../utils/numberFormats";
import { CardRow, CardRowTitle, CardRowResponse } from "./Styled";

const CardContentRowCurrency = ({ title, val, localeType, currencyType }) => {
	let numVal = formatCurrency(val, localeType, currencyType);
	return (
		<CardRow>
			<CardRowTitle>{title}:</CardRowTitle>
			<CardRowResponse>{numVal}</CardRowResponse>
		</CardRow>
	);
};

export default CardContentRowCurrency;
