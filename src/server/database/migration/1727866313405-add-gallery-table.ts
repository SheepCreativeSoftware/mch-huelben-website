import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGalleryTable1727866313405 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query(`CREATE TABLE gallery (
			id UUID DEFAULT UUID(),
			title TINYTEXT NOT NULL,
			description TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query('DROP TABLE gallery');
	}
}
