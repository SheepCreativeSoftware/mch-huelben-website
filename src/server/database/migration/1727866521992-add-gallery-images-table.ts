import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGalleryImagesTable1727866521992 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE gallery_images (
			id UUID DEFAULT UUID(),
			title TINYTEXT NOT NULL,
			description TEXT NOT NULL,
			image_url TINYTEXT NOT NULL,
			file_type TINYTEXT,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
			gallery_id UUID NOT NULL,
			PRIMARY KEY (id),
			CONSTRAINT fk_gallery_images_gallery
				FOREIGN KEY (gallery_id)
				REFERENCES gallery(id)
				ON DELETE CASCADE
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE gallery_images');
	}
}
