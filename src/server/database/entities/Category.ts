import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Gallery } from './Gallery.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('category')
class Category {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	identifier: string;

	@Column({
		name: 'technical_name',
		type: 'tinytext',
	})
	technicalName: string;

	@Column({
		name: 'title',
		type: 'tinytext',
	})
	title: string;

	@Column({
		name: 'description',
		type: 'text',
	})
	description: string;

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

	@OneToMany(() => Gallery, (gallery) => gallery.category)
	galleries: Relation<Gallery[]>;
}

/* eslint-enable new-cap -- This is not a constructor */

export { Category };
