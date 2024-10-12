import { getLatestNews } from '../../../services/news-service.js';
import type { Handler } from 'express';
import { RequestNewsQueryValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';

const getNewsHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestNewsQueryValidator.parse(req.query);

			const result = await getLatestNews({ count: requestQuery.count, offset: requestQuery.offset });

			res.status(StatusCodes.OK).send(result);
		} catch (error) {
			next(error);
		}
	};
};

export { getNewsHandle };
