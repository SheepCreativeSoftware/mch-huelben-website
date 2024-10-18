import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenTable1728896822994 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is given by the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE refresh_token (
			id UUID DEFAULT UUID(),
			token TEXT NOT NULL,
			user_id UUID NOT NULL,
			PRIMARY KEY (id),
			CONSTRAINT fk_refresh_token_user
				FOREIGN KEY (user_id) 
				REFERENCES users (id)
				ON DELETE CASCADE
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE refresh_token');
	}
}
