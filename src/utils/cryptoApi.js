import axios from "axios";

// Get Coin History
export const getCoinHistory = (time, id) => {
	return axios.get(`http://coincap.io/history/${time}/${id}`);
};

// Get Global Coin Info
export const getGlobalInfo = () => {
	return axios.get("https://api.coinmarketcap.com/v1/global/");
};

// Get Full Crypto List
export const getFullCryptoList = () => {
	return axios.get("http://coincap.io/map");
};

// Get Specific Crypto
export const getSpecificCrypto = id => {
	return axios.get(`http://coincap.io/page/${id}`);
};

// Get Exchange Rates
export const getExchangeRates = () => {
	return axios.get("https://api.fixer.io/latest?base=USD");
};
