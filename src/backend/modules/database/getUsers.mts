import { getConnection } from './connectDatabase.mjs';
import { randomUUID } from 'crypto';

const getUsers = async () => {
	const conn = await getConnection();
	const users = await conn.query('SELECT id, name, email, role FROM users LIMIT 1000') as Express.User[];
	return users;
};

// eslint-disable-next-line no-shadow
const setUser = async ({ email, name, role }: { email: string, name: string, role: string }) => {
	if(role !== 'admin' && role !== 'user') throw new Error('Failed to Add User: role is invalid');
	if(!email.includes('@')) throw new Error('Failed to Add User: email is invalid');
	const users = await getUsers();
	if(users.some((user) => user.email === email)) throw new Error('Failed to Add User: email is already existing');

	const conn = await getConnection();
	await conn.query('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)', [
		randomUUID(),
		name,
		email,
		role,
	]);
};

// eslint-disable-next-line no-shadow
const removeUser = async ({ email, name, role }: { email: string, name: string, role: string }) => {
	const conn = await getConnection();
	await conn.query('DELETE FROM users WHERE email=? AND name=? AND role=? LIMIT 1', [
		email,
		name,
		role,
	]);
};

export { getUsers, removeUser, setUser };
