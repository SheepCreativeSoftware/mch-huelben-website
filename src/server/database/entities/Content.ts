import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Pages } from './Pages.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('content')
class Content {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		name: 'content',
		type: 'text',
	})
	content: string;

	@Column({
		name: 'is_active',
		type: 'boolean',
	})
	isActive: boolean;

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

	@ManyToOne(() => Pages, (page) => page.contents)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_content_pages',
		name: 'page_id',
		referencedColumnName: 'identifier',
	})
	page: Relation<Pages>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Content };
