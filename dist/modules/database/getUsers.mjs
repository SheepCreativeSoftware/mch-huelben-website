import { getConnection } from './connectDatabase.mjs';
const getUsers = async () => {
    const conn = await getConnection();
    const users = await conn.query('SELECT id, name, email, role FROM users LIMIT 1000');
    return users;
};
const zero = 0;
// eslint-disable-next-line id-length
const getUserById = async (id) => {
    const conn = await getConnection();
    const users = await conn.query('SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1', [id]);
    return users[zero];
};
// eslint-disable-next-line id-length
const getUserByEmail = async (email) => {
    const conn = await getConnection();
    const users = await conn.query('SELECT id, name, email, role FROM users WHERE email = ? LIMIT 1', [email]);
    return users[zero];
};
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
// eslint-disable-next-line no-shadow
const removeUser = async ({ email, name, role }) => {
    const conn = await getConnection();
    await conn.query('DELETE FROM users WHERE email=? AND name=? AND role=? LIMIT 1', [
        email,
        name,
        role,
    ]);
};
export { getUsers, getUserByEmail, getUserById, removeUser, setUser };
