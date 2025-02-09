import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordResetPage1739063485026 implements MigrationInterface {
	// eslint-disable-next-line id-length -- this is given by the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Add to pages and meta table
		await queryRunner.query(`INSERT INTO pages (technical_name)
		VALUES ('password-reset');`);
		await queryRunner.query(`INSERT INTO meta (title, description, type, page_id) 
	VALUES ('Passwort zurücksetzen', 'Passwort zurücksetzen', 'website', (
		SELECT id FROM pages WHERE technical_name = 'password-reset'
	));`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM meta WHERE page_id = (
		SELECT id FROM pages
		WHERE technical_name = 'password-reset'
	);`);
		await queryRunner.query(`DELETE FROM pages 
		WHERE technical_name = 'password-reset';`);
	}
}
