import React from "react";

const NumberBasic = ({ val, locale }) => {
	const formattedNumber = Intl.NumberFormat(locale).format(val);
	return <span>{formattedNumber}</span>;
};

export default NumberBasic;
