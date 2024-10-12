import { z as zod } from 'zod';

const RequestPagesQueryValidator = zod.object({
	technicalName: zod.string(),
});

const RequestEditPagesContentBodyValidator = zod.object({
	content: zod.string().optional(),
	identifier: zod.string().uuid(),
	title: zod.string().optional(),
});

export { RequestEditPagesContentBodyValidator, RequestPagesQueryValidator };
