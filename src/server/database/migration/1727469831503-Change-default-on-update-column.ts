import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDefaultOnUpdateColumn1727469831503 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE news MODIFY updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE meta MODIFY updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE events MODIFY updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE pages MODIFY updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE content MODIFY updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE news MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE meta MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE events MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE pages MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
		await queryRunner.query('ALTER TABLE content MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
	}
}
