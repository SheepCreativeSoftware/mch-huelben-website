import { getConnection } from '../connectDatabase.mjs';
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
export { getUsers, getUserByEmail, getUserById };
