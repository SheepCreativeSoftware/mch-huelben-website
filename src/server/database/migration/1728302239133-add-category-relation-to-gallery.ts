import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryRelationToGallery1728302239133 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE gallery
			ADD COLUMN category_id UUID,
			ADD CONSTRAINT fk_gallery_category
				FOREIGN KEY (category_id)
				REFERENCES category(id)
				ON DELETE SET NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE gallery
			DROP COLUMN category_id,
			DROP CONSTRAINT fk_gallery_category`);
	}
}
