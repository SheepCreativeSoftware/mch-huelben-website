import type { StoreService, StoreServiceOptions } from './StoreServiceInterface.js';
import { dataSource } from '../database/datasource.js';
import { InternalServerException } from '../modules/misc/custom-errors.js';
import { News } from '../database/entities/News.js';
import { z as zod } from 'zod';

const ResponseNewsValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.date(),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updateAt: zod.date().nullish(),
	})),
	offset: zod.number().min(0),
	totalCount: zod.number(),
});

const getLatestNews: StoreService = async ({ count, offset }: StoreServiceOptions) => {
	const [news, totalCount] = await dataSource.getRepository(News).findAndCount({
		order: {
			createdAt: 'DESC',
		},
		relations: {
			event: false,
		},
		skip: offset,
		take: count,
		where: {
			isActive: true,
		},
	});

	const results = ResponseNewsValidator.safeParse({ news, offset: offset ?? 0, totalCount });
	if (!results.success) throw new InternalServerException('Failed to validate news data', { cause: results.error.errors });

	return results.data;
};

export { getLatestNews };
