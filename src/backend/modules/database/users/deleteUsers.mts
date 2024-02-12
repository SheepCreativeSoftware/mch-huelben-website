import { getConnection } from '../connectDatabase.mjs';

// eslint-disable-next-line no-shadow
const removeUser = async ({ email, name, role }: { email: string, name: string, role: string }) => {
	const conn = await getConnection();
	await conn.query('DELETE FROM users WHERE email=? AND name=? AND role=? LIMIT 1', [
		email,
		name,
		role,
	]);
};

export { removeUser };
