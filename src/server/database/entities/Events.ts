import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { News } from './News.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('events')
class Events {
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
		name: 'from_date',
		nullable: false,
		type: 'timestamp',
	})
	fromDate: Date;

	@Column({
		name: 'to_date',
		type: 'timestamp',
	})
	toDate: Date | null;

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

	@OneToOne(() => News, (news) => news.event)
	news: Relation<News>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Events };
