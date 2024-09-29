import { dataSource } from '../database/datasource.js';
import { Events } from '../database/entities/Events.js';
import { InternalServerException } from '../modules/misc/custom-errors.js';
import { MoreThanOrEqual } from 'typeorm';
import type { StoreService } from './StoreServiceInterface.js';
import { z as zod } from 'zod';

const ResponseEventsValidator = zod.array(zod.object({
	createdAt: zod.date(),
	fromDate: zod.date(),
	identifier: zod.string().uuid(),
	isActive: zod.boolean(),
	title: zod.string(),
	toDate: zod.date().nullish(),
	updatedAt: zod.date().nullish(),
}));

const getCurrentEvents: StoreService = async () => {
	const currentDate = new Date();
	const events = await dataSource.getRepository(Events).find({
		order: {
			fromDate: 'DESC',
		},
		where: [
			{
				// eslint-disable-next-line new-cap -- This is not a constructor
				fromDate: MoreThanOrEqual(currentDate),
				isActive: true,
			},
			{
				isActive: true,
				// eslint-disable-next-line new-cap -- This is not a constructor
				toDate: MoreThanOrEqual(currentDate),
			},
		],
	});

	const result = ResponseEventsValidator.safeParse(events);
	if (!result.success) throw new InternalServerException('Failed to validate events data', { cause: result.error.errors });

	return result.data;
};

export { getCurrentEvents };
