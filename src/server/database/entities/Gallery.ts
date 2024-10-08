import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.js';
import { GalleryImages } from './GalleryImages.js';
import { Pages } from './Pages.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('gallery')
class Gallery {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	identifier: string;

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

	@OneToMany(() => GalleryImages, (image) => image.gallery)
	images: Relation<GalleryImages[]>;

	@ManyToOne(() => Category, (category) => category.galleries)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_gallery_category',
		name: 'category_id',
		referencedColumnName: 'identifier',
	})
	category: Relation<Category>;

	@OneToOne(() => Pages)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_gallery_page',
		name: 'page_id',
		referencedColumnName: 'identifier',
	})
	page: Relation<Pages> | null;
}
/* eslint-enable new-cap -- This is not a constructor */

export { Gallery };
