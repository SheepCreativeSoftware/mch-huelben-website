import { z } from 'zod';

const stringToValidDateTransformer = (dateString: string, ctx: z.RefinementCtx): Date => {
	const date = new Date(dateString);
	if (!z.date().safeParse(date).success) {
		ctx.addIssue({
			code: z.ZodIssueCode.invalid_date,
		});
	}
	return date;
};

const stringToPositiveNumberTransformer = (numberString: string, ctx: z.RefinementCtx): number => {
	const number = Number(numberString);
	if (!z.number().safeParse(number).success) {
		ctx.addIssue({
			code: z.ZodIssueCode.invalid_type,
			expected: 'number',
			received: typeof number,
		});
	}
	if (!Number.isInteger(number)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Number must be an integer',
		});
	}

	if (number < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.too_small,
			inclusive: true,
			minimum: 0,
			type: 'number',
		});
	}
	return number;
};

const stringToPositiveNumberOrUndefinedTransformer = (numberString: string | undefined, ctx: z.RefinementCtx): number | undefined => {
	// eslint-disable-next-line no-undefined -- Make the value optional when it is not a number
	if (typeof numberString === 'undefined' || numberString === '') return undefined;
	return stringToPositiveNumberTransformer(numberString, ctx);
};

export { stringToValidDateTransformer, stringToPositiveNumberTransformer, stringToPositiveNumberOrUndefinedTransformer };
