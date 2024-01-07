import { UserRoles } from '../types/UserRoles.js';

declare global {
    namespace Express {
        interface User {
			email: string,
			id: `${string}-${string}-${string}-${string}-${string}`,
			name: string,
			role: UserRoles,
		}

        // eslint-disable-next-line no-shadow
        interface Request {
            user?: User ;
		}
	}
}
