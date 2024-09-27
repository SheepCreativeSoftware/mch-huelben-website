import { dataSource } from '../datasource.js';
import { News } from '../entities/News.js';

const NewsRepository = dataSource.getRepository(News).extend({
	async getLatestNews(count?: number, offset?: number): Promise<{ news: News[], totalCount: number }> {
		const [news, totalCount] = await this.findAndCount({
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

		return { news, totalCount };
	},
	getNewsTotalCount(): Promise<number> {
		return this.count({
			where: {
				isActive: true,
			},
		});
	},
});

export { NewsRepository };
