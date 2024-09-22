import { stringToPositiveNumberOrUndefinedTransformer } from '../../../../modules/transform/validation-transformer';
import { z as zod } from 'zod';

const RequestNewsQueryValidator = zod.object({
	count: zod.string().optional().transform(stringToPositiveNumberOrUndefinedTransformer),
	offset: zod.string().optional().transform(stringToPositiveNumberOrUndefinedTransformer),
});

export { RequestNewsQueryValidator };
