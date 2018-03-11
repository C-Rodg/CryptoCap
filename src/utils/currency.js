export const currencySelect = [
	{ value: "USD", label: "US Dollar", locale: "en-US" },
	{ value: "AUD", label: "Australian Dollar", locale: "en-au" },
	{ value: "BRL", label: "Brazilian Real", locale: "pt-br" },
	{ value: "GBP", label: "British Pound", locale: "en-gb" },
	{ value: "BGN", label: "Bulgarian Lev", locale: "bg" },
	{ value: "CAD", label: "Canadian Dollar", locale: "en-ca" },
	{ value: "CNY", label: "Chinese Yuan", locale: "zh" },
	{ value: "HRK", label: "Croatian Kuna", locale: "hr" },
	{ value: "CZK", label: "Czech Koruna", locale: "cs" },
	{ value: "DKK", label: "Danish Krone", locale: "da" },
	{ value: "EUR", label: "Euro", locale: "de" },
	{ value: "HKD", label: "Hong Kong Dollar", locale: "zh-hk" },
	{ value: "HUF", label: "Hungarian Forint", locale: "hu" },
	{ value: "ISK", label: "Icelandic Krona", locale: "is" },
	{ value: "INR", label: "Indian Rupee", locale: "pa-in" },
	{ value: "IDR", label: "Indonesian Rupiah", locale: "id" },
	{ value: "ILS", label: "Israeli New Shekel", locale: "he" },
	{ value: "JPY", label: "Japanese Yen", locale: "ja" },
	{ value: "MYR", label: "Malaysian Ringgit", locale: "ms" },
	{ value: "MXN", label: "Mexican Peso", locale: "es-mx" },
	{ value: "NZD", label: "New Zealand Dollar", locale: "en-nz" },
	{ value: "NOK", label: "Norwegian Krone", locale: "no" },
	{ value: "PHP", label: "Philippine Piso", locale: "en-ph" },
	{ value: "PLN", label: "Polish Zloty", locale: "pl" },
	{ value: "RON", label: "Romanian Leu", locale: "ro" },
	{ value: "RUB", label: "Russian Ruble", locale: "ru" },
	{ value: "SGD", label: "Singapore Dollar", locale: "si" },
	{ value: "ZAR", label: "South African Rand", locale: "en-za" },
	{ value: "KRW", label: "South Korean Won", locale: "ko-kr" },
	{ value: "SEK", label: "Swedish Krona", locale: "sv" },
	{ value: "CHF", label: "Swiss Franc", locale: "de-ch" },
	{ value: "THB", label: "Thai Baht", locale: "th" },
	{ value: "TRY", label: "Turkish Lira", locale: "tr" }
];

// Format USD or translate to new currency
export const translateCurrency = (num, type, locale, exchangeRates) => {
	let val = num;
	if (
		type !== "USD" &&
		exchangeRates &&
		exchangeRates.rates &&
		exchangeRates.rates[type]
	) {
		val = exchangeRates.rates[type] * num;
	}
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: type
	}).format(val);
};
