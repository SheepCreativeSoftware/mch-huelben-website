const getDateFormatOptions = (): Intl.DateTimeFormatOptions => {
	return {
		dateStyle: 'medium',
		timeStyle: 'short',
	};
};

export { getDateFormatOptions };
