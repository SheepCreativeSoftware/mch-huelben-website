import { dataSource } from '../datasource.js';
import { Like } from 'typeorm';
import { Meta } from '../entities/Meta.js';

const NewsRepository = dataSource.getRepository(Meta).extend({
	getMetaByPage(pageTechnicalName: string): Promise<Meta | null> {
		return this.findOneBy({
			// eslint-disable-next-line new-cap -- this is not a constructor
			page: Like(pageTechnicalName),
		});
	},
});

export { NewsRepository };
