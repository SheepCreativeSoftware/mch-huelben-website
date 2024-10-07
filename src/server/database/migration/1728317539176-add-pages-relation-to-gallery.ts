import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPagesRelationToGallery1728317539176 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE gallery
			ADD COLUMN page_id UUID,
			ADD CONSTRAINT fk_gallery_page
				FOREIGN KEY (page_id)
				REFERENCES pages(id)
				ON DELETE SET NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE gallery
			DROP COLUMN page_id,
			DROP CONSTRAINT fk_gallery_page`);
	}
}
