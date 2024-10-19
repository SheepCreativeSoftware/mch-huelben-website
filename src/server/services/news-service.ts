import { InternalServerException, NotFoundException } from '../modules/misc/custom-errors.js';
import type { StoreService, StoreServiceOptions } from './StoreServiceInterface.js';
import { dataSource } from '../database/datasource.js';
import { Events } from '../database/entities/Events.js';
import type { FindOptionsWhere } from 'typeorm';
import { News } from '../database/entities/News.js';
import { removeImagesOnChange } from '../modules/misc/remove-images-on-content-change.js';
import { z as zod } from 'zod';

const ResponseNewsValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.date(),
		identifier: zod.string().uuid(),
		isActive: zod.boolean(),
		title: zod.string(),
		updatedAt: zod.date().nullish(),
	})),
	offset: zod.number().min(0),
	totalCount: zod.number(),
});

const getSpecificLatestNews = async ({ count, offset, findOptions }: {
	count?: number,
	offset?: number,
	findOptions?: FindOptionsWhere<News> | FindOptionsWhere<News>[]
}) => {
	const [news, totalCount] = await dataSource.getRepository(News).findAndCount({
		order: {
			createdAt: 'DESC',
		},
		relations: {
			event: false,
		},
		skip: offset,
		take: count,
		where: findOptions,
	});

	const results = ResponseNewsValidator.safeParse({ news, offset: offset ?? 0, totalCount });
	if (!results.success) throw new InternalServerException('Failed to validate news data', { cause: results.error.errors });

	return results.data;
};

const getLatestNews: StoreService = async ({ count, offset }: StoreServiceOptions) => {
	return getSpecificLatestNews({ count, findOptions: { isActive: true }, offset });
};

const getAllLatestNews: StoreService = async ({ count, offset }: StoreServiceOptions) => {
	return getSpecificLatestNews({ count, offset });
};

const updateNewsArticle = async ({ content, identifier, title }: { content?: string, identifier: string, title?: string }): Promise<void> => {
	const repository = dataSource.getRepository(News);

	const newsEntity = await repository.findOne({ where: { identifier } });
	if (!newsEntity) throw new NotFoundException('Failed to find page content');
	if (content) await removeImagesOnChange({ newContent: content, previousContent: newsEntity.content });
	const result = await repository.update(identifier, { content, title });

	if (!result.affected) throw new InternalServerException('Failed to update news article', { cause: result.raw });
};

const updateNewsArticleActiveState = async ({ identifier, isActive }: { identifier: string, isActive: boolean }): Promise<void> => {
	const repository = dataSource.getRepository(News);
	const result = await repository.update(identifier, { isActive });

	if (!result.affected) throw new InternalServerException('Failed to change news article active state', { cause: result.raw });
};

const addNewsArticle = async ({ content, title, event }: {
	content: string,
	title: string,
	event?: { title: string, fromDate: Date, toDate: Date }
}): Promise<void> => {
	// eslint-disable-next-line init-declarations -- Undefined is a valid value
	let eventEntity: Events | undefined;
	if (event) {
		const eventRepository = dataSource.getRepository(Events);
		eventEntity = eventRepository.create({ ...event });
		const eventResult = await eventRepository.insert(eventEntity);

		if (!eventResult.identifiers.length) throw new InternalServerException('Failed to add event', { cause: eventResult.raw });
	}

	const repository = dataSource.getRepository(News);
	const newsEntity = repository.create({ content, event: eventEntity, title });
	await repository.save(newsEntity);
};

export { addNewsArticle, getLatestNews, getAllLatestNews, updateNewsArticle, updateNewsArticleActiveState };
