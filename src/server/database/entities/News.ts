import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Events } from './Events.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity()
class News {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		default: '',
		name: 'title',
		type: 'tinytext',
	})
	title: string;

	@Column({
		default: '',
		name: 'content',
		type: 'text',
	})
	content: string;

	@Column({
		default: true,
		name: 'is_active',
		type: 'boolean',
	})
	isActive: boolean;

	@CreateDateColumn({
		default: new Date(),
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date | null;

	@OneToOne(() => Events)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_news_events',
		name: 'event_id',
		referencedColumnName: 'identifier',
	})
	event: Relation<Events>;
}

/* eslint-enable new-cap -- This is not a constructor */
export { News };
