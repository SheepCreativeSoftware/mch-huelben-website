import { dataSource } from '../datasource.js';
import { Like } from 'typeorm';
import { Pages } from '../entities/Pages.js';

const PagesRepository = dataSource.getRepository(Pages).extend({
	getPageContent(pageTechnicalName: string): Promise<Pages | null> {
		return this.findOne({
			relations: {
				contents: true,
				meta: false,
			},
			where: {
				contents: {
					isActive: true,
				},
				// eslint-disable-next-line new-cap -- this is not a constructor
				technicalName: Like(pageTechnicalName),
			},
		});
	},
});

export { PagesRepository };
