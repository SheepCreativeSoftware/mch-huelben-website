import { getConnection } from '../connectDatabase.mjs';

const getUsers = async () => {
	const conn = await getConnection();
	const users = await conn.query('SELECT id, name, email, role FROM users LIMIT 1000') as Express.User[];
	return users;
};

const zero = 0;
// eslint-disable-next-line id-length
const getUserById = async (id: string) => {
	const conn = await getConnection();
	const users = await conn.query('SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1', [id]) as Express.User[] | undefined[];
	return users[zero];
};

// eslint-disable-next-line id-length
const getUserByEmail = async (email: string) => {
	const conn = await getConnection();
	const users = await conn.query('SELECT id, name, email, role FROM users WHERE email = ? LIMIT 1', [email]) as Express.User[] | undefined[];
	return users[zero];
};

export { getUsers, getUserByEmail, getUserById };
