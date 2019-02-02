// Helper - month enum
const months = {
	0: 'JAN',
	1: 'FEB',
	2: 'MAR',
	3: 'APR',
	4: 'MAY',
	5: 'JUN',
	6: 'JUL',
	7: 'AUG',
	8: 'SEP',
	9: 'OCT',
	10: 'NOV',
	11: 'DEC'
};

// Helper - add left pad to number
const leftPad = num => {
	if (String(num).length === 1) {
		return `0${num}`;
	}
	return String(num);
};

// Return date - formated 16:08, JAN 21st, 2017
export const getTimeString = unixStamp => {
	let date = null;
	if (unixStamp && String(unixStamp).indexOf('T') > -1) {
		date = new Date(unixStamp);
	} else {
		date = new Date(1000 * parseInt(unixStamp, 10));
	}
	return `${date.getHours()}:${leftPad(date.getMinutes())}, ${
		months[date.getMonth()]
	} ${ordinalSuffixOf(date.getDate())}, ${date.getFullYear()}`;
};

// Get Ordinal suffix
export const ordinalSuffixOf = i => {
	if (!i) {
		return '';
	}
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + 'st';
	}
	if (j == 2 && k != 12) {
		return i + 'nd';
	}
	if (j == 3 && k != 13) {
		return i + 'rd';
	}
	return i + 'th';
};

// Get Date Ticker String
export const dateTickerFormat = t => {
	const date = new Date(t);
	return `${date.getHours()}:${leftPad(date.getMinutes())}, ${date.getMonth() +
		1}/${date.getDate()}/${date
		.getFullYear()
		.toString()
		.substr(-2)}`;
};
