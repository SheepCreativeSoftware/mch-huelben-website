import { getUserByEmail } from './getUsers.mjs';
declare const setUser: ({ email, name, role }: {
    email: string;
    name: string;
    role: string;
}) => Promise<void>;
export { getUserByEmail, setUser };
