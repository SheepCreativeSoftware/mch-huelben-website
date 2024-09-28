import { z as zod } from 'zod';

const ResponsePagesBodyValidator = zod.object({
	contents: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.date(),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updatedAt: zod.date().nullish(),
	})),
	createdAt: zod.date(),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	updatedAt: zod.date().nullish(),
});

export { ResponsePagesBodyValidator };
