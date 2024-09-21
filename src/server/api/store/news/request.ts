import { z as zod } from 'zod';

/* eslint-disable no-undefined -- Make the value optional when it is not a number */
const RequestNewsQueryValidator = zod.object({
	count: zod.string().optional().transform((value) => Number(value) || undefined),
	offset: zod.string().optional().transform((value) => Number(value) || undefined),
});
/* eslint-enable no-undefined -- Make the value optional when it is not a number */

export { RequestNewsQueryValidator };
