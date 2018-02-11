import React from "react";

const NumberPercent = ({ val, locale, showColors }) => {
	const value = val * 0.01;
	let formattedNumber = Intl.NumberFormat(locale, {
		style: "percent",
		maximumFractionDigits: 2
	}).format(value);
	let colorClass = "";
	if (showColors) {
		if (String(val).indexOf("-") > -1) {
			colorClass = "percent-negative";
		} else {
			colorClass = "percent-positive";
			formattedNumber += "+" + formattedNumber;
		}
	}
	return <span className={colorClass}>{formattedNumber}</span>;
};

export default NumberPercent;
