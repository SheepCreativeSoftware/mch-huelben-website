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

export { stringToValidDateTransformer };
