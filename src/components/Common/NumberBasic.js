import React from "react";

const NumberBasic = ({ val, locale }) => {
	const formattedNumber = Intl.NumberFormat(locale, {
		maximumFractionDigits: 10
	}).format(val);
	return <span>{formattedNumber}</span>;
};

export default NumberBasic;
