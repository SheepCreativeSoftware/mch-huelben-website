import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContentTable1727302115148 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE content (
				id UUID DEFAULT UUID(),
				title TINYTEXT NOT NULL,
				content TEXT NOT NULL,
				created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				page_id UUID NOT NULL,
				PRIMARY KEY (id),
				CONSTRAINT fk_content_pages
					FOREIGN KEY (page_id)
					REFERENCES pages(id)
					ON DELETE CASCADE
			)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE content');
	}
}
