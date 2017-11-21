import React from "react";
const numeral = require("numeral");
import { CardRow, CardRowTitle, CardRowResponse } from "./Styled";

const CardContentRow = ({
	title,
	val,
	format,
	isNumeral,
	postFix,
	isPercent
}) => {
	let numVal = isNumeral ? numeral(val).format(format) : val;
	let percentClass = "";
	if (isPercent) {
		percentClass = val.indexOf("-") > -1 ? "error" : "success";
		if (percentClass === "success") {
			numVal = "+" + numVal;
		}
	}
	return (
		<CardRow>
			<CardRowTitle>{title}:</CardRowTitle>
			<CardRowResponse className={percentClass}>
				{numVal + (postFix || "")}
			</CardRowResponse>
		</CardRow>
	);
};

export default CardContentRow;
