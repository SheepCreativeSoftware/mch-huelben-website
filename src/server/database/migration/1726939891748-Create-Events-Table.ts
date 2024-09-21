import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventsTable1726939891748 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE events (
				id UUID DEFAULT UUID(),
				title TINYTEXT NOT NULL,
				from_date TIMESTAMP NOT NULL,
				to_date TIMESTAMP NOT NULL,
				is_active BOOLEAN NOT NULL DEFAULT true,
				created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				PRIMARY KEY (id)
			)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE events');
	}
}
