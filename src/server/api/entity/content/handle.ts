import type { Handler } from 'express';
import { RequestUpdateContentBodyValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';
import { updateContent } from '../../../services/content-service.js';

const getUpdateContentHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestUpdateContentBodyValidator.parse(req.body);

			await updateContent(requestBody);

			res.status(StatusCodes.OK).send({ message: 'Page content updated' });
		} catch (error) {
			next(error);
		}
	};
};

export { getUpdateContentHandle };
