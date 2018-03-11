// Libraries
import React from "react";

// Number format component
const NumberBasic = ({ val, locale }) => {
	const formattedNumber = Intl.NumberFormat(locale, {
		maximumFractionDigits: 10
	}).format(val);
	return <span>{formattedNumber}</span>;
};

export default NumberBasic;
