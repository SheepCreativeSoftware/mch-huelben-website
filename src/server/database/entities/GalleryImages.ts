import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from 'typeorm';
import { Gallery } from './Gallery.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('gallery_images')
class GalleryImages {
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

	@Column({
		name: 'image_url',
		type: 'text',
	})
	imageUrl: string;

	@Column({
		name: 'file_type',
		nullable: true,
		type: 'tinytext',
	})
	fileType: string | null;

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

	@ManyToOne(() => Gallery, (gallery) => gallery.images)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_gallery_images_gallery',
		name: 'gallery_id',
		referencedColumnName: 'identifier',
	})
	gallery: Relation<Gallery>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { GalleryImages };
