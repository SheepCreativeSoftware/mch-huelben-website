import { z as zod } from 'zod';

const RequestMetaQueryValidator = zod.object({
	technicalName: zod.string(),
});

export { RequestMetaQueryValidator };
