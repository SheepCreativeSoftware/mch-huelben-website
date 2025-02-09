/* eslint-disable no-magic-numbers -- Don't over complicate Validator */
import { z as zod } from 'zod';

const RequestBodyValidator = zod.object({
	email: zod.string().max(50).email().toLowerCase(),
});

export { RequestBodyValidator };
