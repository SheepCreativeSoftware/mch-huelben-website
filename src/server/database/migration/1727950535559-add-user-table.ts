import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1727950535559 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE users (
			id UUID DEFAULT UUID(),
			email TINYTEXT NOT NULL,
			role ENUM('User', 'Admin') NOT NULL,
			password TINYTEXT NOT NULL,
			active BOOLEAN NOT NULL DEFAULT TRUE,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			UNIQUE (email)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE users');
	}
}
