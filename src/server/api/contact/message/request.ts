import { z as zod } from 'zod';

const RequestBodyContactFormValidator = zod.object({
	GDPRConfirmation: zod.boolean(),
	email: zod.string().email(),
	message: zod.string().min(1),
	name: zod.string().min(1),
	subject: zod.string().min(1),
}).transform(({ GDPRConfirmation, email, message, name, subject }) => {
	const escapeString = (value: string): string => {
		return value.replace(/&/g, '&amp')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;')
			.replace(/`/g, '&#x60;')
			.replace(/=/g, '&#x3D;')
			.trim();
	};

	return {
		GDPRConfirmation,
		email: escapeString(email),
		message: escapeString(message),
		name: escapeString(name),
		subject: escapeString(subject),
	};
});

export { RequestBodyContactFormValidator };
