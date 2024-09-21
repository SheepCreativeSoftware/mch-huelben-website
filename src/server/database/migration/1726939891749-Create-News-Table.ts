import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsTable1726939891749 implements MigrationInterface {
	// eslint-disable-next-line id-length -- This is a method from the interface
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE news (
				id UUID DEFAULT UUID(),
				title TINYTEXT NOT NULL,
				content TEXT NOT NULL,
				is_active BOOLEAN NOT NULL DEFAULT true,
				created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				event_id UUID,
				PRIMARY KEY (id),
				CONSTRAINT fk_news_events
					FOREIGN KEY (event_id)
					REFERENCES events(id)
					ON DELETE CASCADE
			)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE news');
	}
}
