import { z as zod } from 'zod';

const ResponseNewsBodyValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.date(),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updateAt: zod.date().nullish(),
	})),
	offset: zod.number().min(0),
	totalCount: zod.number(),
});

export { ResponseNewsBodyValidator };
