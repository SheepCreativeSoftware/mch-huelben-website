import { stringToValidDateTransformer } from '../../../../modules/transform/validation-transformer';
import { z as zod } from 'zod';

const ResponseNewsBodyValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().transform(stringToValidDateTransformer),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updateAt: zod.string().transform(stringToValidDateTransformer),
	})),
	offset: zod.number().positive(),
});

export { ResponseNewsBodyValidator };
