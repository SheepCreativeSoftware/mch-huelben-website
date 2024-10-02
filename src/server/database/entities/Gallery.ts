import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GalleryImages } from './GalleryImages.js';

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
	images: GalleryImages[];
}
/* eslint-enable new-cap -- This is not a constructor */

export { Gallery };
