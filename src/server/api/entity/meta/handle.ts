import { getMetaData } from '../../../services/meta-service.js';
import type { Handler } from 'express';
import { RequestMetaQueryValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';

const getMetaHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestMetaQueryValidator.parse(req.query);

			const result = await getMetaData({ technicalName: requestQuery.technicalName });

			res.status(StatusCodes.OK).send(result);
		} catch (error) {
			next(error);
		}
	};
};

export { getMetaHandle };
