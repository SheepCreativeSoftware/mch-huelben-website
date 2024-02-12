import { getConnection } from '../connectDatabase.mjs';
import { getUserByEmail } from './getUsers.mjs';
// eslint-disable-next-line no-shadow
const setUser = async ({ email, name, role }) => {
    if (role !== 'admin' && role !== 'user')
        throw new Error('Failed to Add User: role is invalid');
    if (!email.includes('@'))
        throw new Error('Failed to Add User: email is invalid');
    const user = await getUserByEmail(email);
    if (user && user.email === email)
        throw new Error('Failed to Add User: email is already existing');
    const conn = await getConnection();
    await conn.query('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', [
        name,
        email,
        role,
    ]);
};
export { getUserByEmail, setUser };
