import { Equal, MoreThanOrEqual } from 'typeorm';
import { dataSource } from '../database/datasource.js';
import { Events } from '../database/entities/Events.js';
import { InternalServerException } from '../modules/misc/custom-errors.js';
import { z as zod } from 'zod';

const ResponseEventsValidator = zod.array(zod.object({
	createdAt: zod.date(),
	fromDate: zod.date(),
	identifier: zod.string().uuid(),
	isActive: zod.boolean(),
	title: zod.string(),
	toDate: zod.date().nullable(),
	updatedAt: zod.date().nullable(),
}));

const getCurrentEvents = async (): Promise<Omit<Events, 'news'>[]> => {
	const currentDate = new Date();
	const events = await dataSource.getRepository(Events).find({
		order: {
			fromDate: 'DESC',
		},
		/* eslint-disable new-cap -- This is not a constructor */
		where: [
			{
				fromDate: MoreThanOrEqual(currentDate),
				isActive: true,
				news: {
					isActive: Equal(true),
				},
			},
			{
				isActive: true,
				news: {
					isActive: Equal(true),
				},
				toDate: MoreThanOrEqual(currentDate),
			},
		],
		/* eslint-enable new-cap -- This is not a constructor */
	});

	const result = ResponseEventsValidator.safeParse(events);
	if (!result.success) throw new InternalServerException('Failed to validate events data', { cause: result.error.errors });

	return result.data;
};

export { getCurrentEvents };
