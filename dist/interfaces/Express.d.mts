import { UserRoles } from '../types/UserRoles.js';
declare global {
    namespace Express {
        interface User {
            email: string;
            id: number;
            name: string;
            role: UserRoles;
        }
        interface Request {
            user?: User;
        }
    }
}
export { Express };
