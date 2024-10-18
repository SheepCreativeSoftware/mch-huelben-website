import {
	stringToBooleanTransformerOrUndefined,
	stringToPositiveNumberOrUndefinedTransformer,
} from '../../../../shared/transform/validation-transformer.js';
import { z as zod } from 'zod';

const RequestNewsQueryValidator = zod.object({
	count: zod.string().optional().transform(stringToPositiveNumberOrUndefinedTransformer),
	includeDisabled: zod.string().optional().transform(stringToBooleanTransformerOrUndefined),
	offset: zod.string().optional().transform(stringToPositiveNumberOrUndefinedTransformer),
});

const RequestUpdateNewsArticleBodyValidator = zod.object({
	content: zod.string().optional(),
	identifier: zod.string(),
	title: zod.string().optional(),
});

const RequestUpdateNewsArticleActiveStateBodyValidator = zod.object({
	identifier: zod.string(),
	isActive: zod.boolean(),
});

export { RequestNewsQueryValidator, RequestUpdateNewsArticleBodyValidator, RequestUpdateNewsArticleActiveStateBodyValidator };
