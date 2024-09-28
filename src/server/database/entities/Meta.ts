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
		name: 'title',
		type: 'text',
	})
	title: string | null;

	@Column({
		name: 'type',
		type: 'tinytext',
	})
	type: string | null;

	@Column({
		name: 'image',
		type: 'text',
	})
	image: string | null;

	@Column({
		name: 'description',
		type: 'text',
	})
	description: string | null;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date | null;

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
