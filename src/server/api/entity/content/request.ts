import { z as zod } from 'zod';

const RequestUpdateContentBodyValidator = zod.object({
	content: zod.string().optional(),
	identifier: zod.string().uuid(),
	title: zod.string().optional(),
});

export { RequestUpdateContentBodyValidator };
