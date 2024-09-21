import { z as zod } from 'zod';

const RequestNewsQueryValidator = zod.object({
	count: zod.number().positive(),
	offset: zod.number().positive(),
}).partial();

export { RequestNewsQueryValidator };
