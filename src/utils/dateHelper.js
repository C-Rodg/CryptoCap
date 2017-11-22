const numeral = require("numeral");
// Helper - month enum
const months = {
	0: "JAN",
	1: "FEB",
	2: "MAR",
	3: "APR",
	4: "MAY",
	5: "JUN",
	6: "JUL",
	7: "AUG",
	8: "SEP",
	9: "OCT",
	10: "NOV",
	11: "DEC"
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
	const date = new Date(1000 * parseInt(unixStamp));
	return `${date.getHours()}:${leftPad(date.getMinutes())}, ${
		months[date.getMonth()]
	} ${numeral(date.getDate()).format("0o")}, ${date.getFullYear()}`;
};
