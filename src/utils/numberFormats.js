export const formatCurrency = (price, locale, type) => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: type
	}).format(price);
};

export const formatPercent = (val, locale) => {
	let amount = val;
	if (val > 1) {
		amount = val * 0.01;
	}
	return new Intl.NumberFormat(locale, {
		style: "percent",
		maximumFractionDigits: 2
	}).format(amount);
};

export const formatNumber = (val, locale) => {
	return new Intl.NumberFormat(locale).format(val);
};
