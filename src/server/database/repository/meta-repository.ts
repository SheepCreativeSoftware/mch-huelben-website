import { dataSource } from '../datasource.js';
import { Like } from 'typeorm';
import { Meta } from '../entities/Meta.js';

const MetaRepository = dataSource.getRepository(Meta).extend({
	getMetaByPage(pageTechnicalName: string): Promise<Meta | null> {
		return this.findOneBy({
			page: {
				// eslint-disable-next-line new-cap -- this is not a constructor
				technicalName: Like(pageTechnicalName),
			},
		});
	},
});

export { MetaRepository };
