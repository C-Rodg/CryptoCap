import React from "react";

const NumberCurrency = ({ val, type, exchangeRates, locale }) => {
	let value = val;
	if (type !== "USD" && exchangeRates.rates) {
		const multiplier = exchangeRates.rates[type];
		if (multiplier) {
			value = val * multiplier;
		}
	}
	const price = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: type
	}).format(value);
	return <span>{price}</span>;
};

export default NumberCurrency;
