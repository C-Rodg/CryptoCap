import axios from 'axios';

import { openExchangeKey, coinMarketCapKey } from './sauce';

// Get Coin History
export const getCoinHistory = (time, id) => {
	return axios.get(`http://coincap.io/history/${time}/${id}`);
};

// Get Global Coin Info
export const getGlobalInfo = () => {
	return axios.get('https://api.coinmarketcap.com/v2/global/'); // Deprecated in December
	// CoinMarketCap sucks - abandon
	// return axios({
	// 	method: 'get',
	// 	url: `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`,
	// 	headers: { 'X-CMC_PRO_API_KEY': coinMarketCapKey }
	// });
	return axios.get(`http://coincap.io/global`);
};

// Get Full Crypto List
export const getFullCryptoList = () => {
	return axios.get('http://coincap.io/map');
};

// Get Specific Crypto
export const getSpecificCrypto = id => {
	return axios.get(`http://coincap.io/page/${id}`);
};

// Get Exchange Rates
export const getExchangeRates = () => {
	// return axios.get(
	// 	`http://data.fixer.io/api/latest?access_key=${exchangeKey}&base=USD`
	// );

	return axios.get(
		`https://openexchangerates.org/api/latest.json?app_id=${openExchangeKey}`
	);
};
