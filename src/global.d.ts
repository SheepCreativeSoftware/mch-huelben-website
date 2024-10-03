import type { UUID } from 'node:crypto';

declare global {
	namespace Express {
		interface User {
			role: 'User' | 'Admin';
			userId: UUID;
		}

		interface Request {
			user?: User | undefined;
			isLoggedIn: undefined | (() => boolean);
		}
	}

	interface Window {
		__pinia: string | undefined;
	}
}

