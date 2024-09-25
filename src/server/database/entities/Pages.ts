import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Content } from './Content.js';
import { Meta } from './Meta.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('pages')
class Pages {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		name: 'technical_name',
		type: 'tinytext',
	})
	technicalName: string;

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

	@OneToMany(() => Content, (content) => content.page)
	contents: Relation<Content[]>;

	@OneToOne(() => Meta, (meta) => meta.page)
	meta: Relation<Meta>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Pages };
