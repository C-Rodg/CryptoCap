import axios from 'axios';
import { openExchangeKey } from './sauce';

// Get Coin History
export const getCoinHistory = (time, id) => {
	return axios.get(`http://coincap.io/history/${time}/${id}`);
};

// Get Full Crypto List
export const getFullCryptoList = () => {
	return axios.get('https://api.coincap.io/v2/assets');
};

// Get Specific Crypto
export const getSpecificCrypto = id => {
	return axios.get(`https://api.coincap.io/v2/assets/${id}`);
};

// Get Exchange Rates
export const getExchangeRates = () => {
	return axios.get(
		`https://openexchangerates.org/api/latest.json?app_id=${openExchangeKey}`
	);
};

// Useful APIs:
// coincap.io
// coingeck.com
