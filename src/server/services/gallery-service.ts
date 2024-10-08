import { InternalServerException, NotFoundException } from '../modules/misc/custom-errors.js';
import { Category } from '../database/entities/Category.js';
import { dataSource } from '../database/datasource.js';
import { z as zod } from 'zod';

const ResponseCategoryValidator = zod.array(zod.object({
	createdAt: zod.date(),
	description: zod.string(),
	galleries: zod.array(zod.object({
		createdAt: zod.date(),
		description: zod.string(),
		identifier: zod.string().uuid(),
		images: zod.array(zod.object({
			createdAt: zod.date(),
			description: zod.string(),
			fileType: zod.string().nullable(),
			identifier: zod.string().uuid(),
			imageUrl: zod.string(),
			updatedAt: zod.date().nullable(),
		})),
		page: zod.object({
			technicalName: zod.string(),
		}).nullable(),
		title: zod.string(),
		updatedAt: zod.date().nullable(),
	})),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	title: zod.string(),
	updatedAt: zod.date().nullable(),
}));

type GalleriesByCategory = zod.infer<typeof ResponseCategoryValidator>;

const getGalleriesGroupedByCategory = async (): Promise<GalleriesByCategory> => {
	const categories = await dataSource.getRepository(Category).find({
		relations: {
			galleries: {
				images: true,
				page: true,
			},
		},
	});

	if (categories.length === 0) throw new NotFoundException('No galleries found');

	const result = ResponseCategoryValidator.safeParse(categories);
	if (!result.success) throw new InternalServerException('Failed to validate galleries data', { cause: result.error.errors });

	return result.data;
};

export { getGalleriesGroupedByCategory };
export type { GalleriesByCategory };
