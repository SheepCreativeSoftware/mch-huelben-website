import { dataSource } from '../datasource';
import { News } from '../entities/News';

const NewsRepository = dataSource.getRepository(News).extend({
	async getLatestNews(count?: number, offset?: number): Promise<News[]> {
		const news: News[] = await this.find({
			order: {
				createdAt: 'DESC',
			},
			relations: {
				event: false,
			},
			skip: offset,
			take: count,
		});

		return news;
	},
});

export { NewsRepository };
