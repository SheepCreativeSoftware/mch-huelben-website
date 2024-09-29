import { InternalServerException, NotFoundException } from '../modules/misc/custom-errors.js';
import { dataSource } from '../database/datasource.js';
import { Like } from 'typeorm';
import { Pages } from '../database/entities/Pages.js';
import type { StoreServiceOptions } from './StoreServiceInterface.js';
import { z as zod } from 'zod';

const ResponsePagesValidator = zod.object({
	contents: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.date(),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updatedAt: zod.date().nullish(),
	})),
	createdAt: zod.date(),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	updatedAt: zod.date().nullish(),
});

const getPagesData = async ({ technicalName }: StoreServiceOptions): Promise<Pages> => {
	if (!technicalName) throw new InternalServerException('Technical name is required');
	const page = await dataSource.getRepository(Pages).findOne({
		relations: {
			contents: true,
			meta: false,
		},
		where: {
			contents: {
				isActive: true,
			},
			// eslint-disable-next-line new-cap -- this is not a constructor
			technicalName: Like(technicalName),
		},
	});

	if (!page) throw new NotFoundException(`Page ${technicalName} not found`);
	const results = ResponsePagesValidator.safeParse(page);
	if (!results.success) throw new InternalServerException('Failed to validate response', { cause: results.error.errors });

	return page;
};

export { getPagesData };
