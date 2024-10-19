import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAditionalContentEntryToAboutPage1729354643430 implements MigrationInterface {
	// eslint-disable-next-line id-length -- this is given by the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query(`INSERT INTO content 
			(title, content, page_id) 
			VALUES (
				'Aditional Content',
				'This is an aditional content entry for the about page.',
				(SELECT id FROM pages WHERE technical_name = 'about')
			);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query('DELETE FROM content WHERE title = \'Aditional Content\';');
	}
}
