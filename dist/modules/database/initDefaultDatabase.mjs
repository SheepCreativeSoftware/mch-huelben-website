import { connectDb, getConnection } from './connectDatabase.mjs';
import { buntstift } from 'buntstift';
import { randomUUID } from 'crypto';
const zero = 0;
const initDatabase = async function () {
    buntstift.info('Initialize DB');
    await connectDb({
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
    });
    const conn = await getConnection();
    try {
        await conn.query(`CREATE TABLE IF NOT EXISTS users (
			id TINYTEXT NOT NULL,
			name TINYTEXT NOT NULL,
			email TINYTEXT NOT NULL,
			role TINYTEXT NOT NULL
		)`);
        buntstift.success('Created users table in DB');
    }
    catch (error) {
        buntstift.error('Failed to create users table in DB');
        if (error instanceof Error)
            buntstift.error(error.message);
    }
    try {
        const result = await conn.query('SELECT email FROM users WHERE email = (?)', [process.env.SMTP_ADMIN_EMAIL]);
        if (result.length === zero) {
            await conn.query('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)', [
                randomUUID(),
                'Admin',
                process.env.SMTP_ADMIN_EMAIL,
                'admin',
            ]);
            buntstift.success('Created Admin user in DB');
        }
    }
    catch (error) {
        buntstift.error('Failed to create admin user in DB');
        if (error instanceof Error)
            buntstift.error(error.message);
    }
    await conn.end();
};
export { initDatabase };
