export const isValidName = (name) => {
	return name.trim() !== "";
};

export const isValidNumber = (number) => {
	const regex = /^\d+$/;
	return regex.test(number);
};

export const isValidMonth = (month) => {
	const regex = /^\d+$/;
	return regex.test(month);
};

export const isValidYear = (year) => {
	const regex = /^\d+$/;
	return regex.test(year);
};

export const isValidCode = (code) => {
	const regex = /^\d+$/;
	return regex.test(code);
};
