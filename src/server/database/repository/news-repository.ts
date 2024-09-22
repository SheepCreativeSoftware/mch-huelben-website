import { dataSource } from '../datasource';
import { News } from '../entities/News';

const NewsRepository = dataSource.getRepository(News).extend({
	getLatestNews(count?: number, offset?: number): Promise<News[]> {
		return this.find({
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
