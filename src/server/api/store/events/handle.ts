import { getCurrentEvents } from '../../../services/events-service.js';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getEventsHandle = (): Handler => {
	return async (_req, res, next) => {
		try {
			const result = await getCurrentEvents({});

			res.status(StatusCodes.OK).send(result);
		} catch (error) {
			next(error);
		}
	};
};

export { getEventsHandle };
