const getDateFormatOptions = (): Intl.DateTimeFormatOptions => {
	return {
		dateStyle: 'medium',
	};
};

const getTimeFormatOptions = (): Intl.DateTimeFormatOptions => {
	return {
		timeStyle: 'short',
	};
};

const getDateTimeFormatOptions = (): Intl.DateTimeFormatOptions => {
	return {
		...getDateFormatOptions(),
		...getTimeFormatOptions(),
	};
};

export { getTimeFormatOptions, getDateFormatOptions, getDateTimeFormatOptions };
