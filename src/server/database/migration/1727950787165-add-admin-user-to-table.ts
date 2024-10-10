import type { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../modules/protection/hashPassword.js';
export class AddAdminUserToTable1727950787165 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		if (typeof process.env.SMTP_ADMIN_EMAIL === 'undefined') throw new Error('Missing SMTP_ADMIN_EMAIL enviroment parameter');
		if (typeof process.env.SMTP_ADMIN_PASSWORD === 'undefined') throw new Error('Missing SMTP_ADMIN_PASSWORD enviroment parameter');

		const hash = await hashPassword(process.env.SMTP_ADMIN_PASSWORD);

		await queryRunner.query(
			`INSERT INTO users (email, role, password) 
			VALUES (?, 'Admin', ?)`,
			[process.env.SMTP_ADMIN_EMAIL, hash],
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		if (typeof process.env.SMTP_ADMIN_EMAIL === 'undefined') throw new Error('Missing SMTP_ADMIN_EMAIL enviroment parameter');
		await queryRunner.query('DELETE FROM users WHERE email = ?', [process.env.SMTP_ADMIN_EMAIL]);
	}
}
