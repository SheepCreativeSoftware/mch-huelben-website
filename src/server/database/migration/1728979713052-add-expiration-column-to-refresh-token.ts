import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpirationColumnToRefreshToken1728979713052 implements MigrationInterface {
	// eslint-disable-next-line id-length -- this is given by the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query('ALTER TABLE refresh_token ADD COLUMN expiration TIMESTAMP NOT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query('ALTER TABLE refresh_token DROP COLUMN expiration;');
	}
}
