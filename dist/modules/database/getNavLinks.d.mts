import { NavLinks } from '../../interfaces/NavLinks.mjs';
type UserRoles = 'none' | 'user' | 'admin';
declare const getNavLinks: (role?: UserRoles, path?: string) => NavLinks[];
export { getNavLinks };
