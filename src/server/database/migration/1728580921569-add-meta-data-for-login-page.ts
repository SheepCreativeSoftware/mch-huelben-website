import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetaDataForLoginPage1728580921569 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is given by the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO pages (technical_name)
			VALUES ('login');`);
		await queryRunner.query(`INSERT INTO meta (title, description, type, page_id)
			VALUES ('Login', 'Login der Seite', 'website', (SELECT id FROM pages WHERE technical_name = 'login'));`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM meta 
			WHERE page_id = (SELECT id FROM pages WHERE technical_name = 'login');`);
		await queryRunner.query(`DELETE FROM pages
			WHERE technical_name = 'login';`);
	}
}
