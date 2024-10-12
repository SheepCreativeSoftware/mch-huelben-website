import { z as zod } from 'zod';

const RequestPagesQueryValidator = zod.object({
	technicalName: zod.string(),
});

export { RequestPagesQueryValidator };
