import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMetaTable1727301366243 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE meta (
				id UUID DEFAULT UUID(),
				keywords TEXT NOT NULL,
				description TEXT NOT NULL,
				created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				page_id UUID NOT NULL,
				PRIMARY KEY (id),
				CONSTRAINT fk_meta_pages
					FOREIGN KEY (page_id)
					REFERENCES pages(id)
					ON DELETE CASCADE
			)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE meta');
	}
}
