/* eslint-disable no-magic-numbers -- Don't over complicate Validator */
import { z as zod } from 'zod';

const RequestBodyValidator = zod.object({
	password: zod.string().min(8).max(50).regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}/),
	token: zod.string().min(1).jwt(),
});

export { RequestBodyValidator };
