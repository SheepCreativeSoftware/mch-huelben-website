import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMetaDataColumns1727526366435 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query(`ALTER TABLE meta
			RENAME COLUMN keywords TO title,
			ADD COLUMN type tinytext,
			ADD COLUMN image text;
			`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.query(`ALTER TABLE meta
			RENAME COLUMN title TO keywords,
			DROP COLUMN type,
			DROP COLUMN image;
			`);
	}
}
