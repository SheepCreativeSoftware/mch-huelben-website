import { getPagesData } from '../../../services/pages-service.js';
import type { Handler } from 'express';
import { RequestPagesQueryValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';

const getPagesHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestPagesQueryValidator.parse(req.query);

			const results = await getPagesData({ technicalName: requestQuery.technicalName });

			res.status(StatusCodes.OK).send(results);
		} catch (error) {
			next(error);
		}
	};
};

export { getPagesHandle };
