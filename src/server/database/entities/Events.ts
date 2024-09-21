import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
		nullable: false,
		type: 'timestamp',
	})
	toDate: Date;

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
	updatedAt: Date;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Events };
