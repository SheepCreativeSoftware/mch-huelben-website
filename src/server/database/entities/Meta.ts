import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Pages } from './Pages.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('meta')
class Meta {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		name: 'keywords',
		type: 'text',
	})
	keywords: string;

	@Column({
		name: 'description',
		type: 'text',
	})
	description: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date;

	@OneToOne(() => Pages, (page) => page.meta)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_meta_pages',
		name: 'page_id',
		referencedColumnName: 'identifier',
	})
	page: Relation<Pages>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Meta };
