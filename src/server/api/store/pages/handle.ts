import { editPageContent, getPagesData } from '../../../services/pages-service.js';
import { RequestEditPagesContentBodyValidator, RequestPagesQueryValidator } from './request.js';
import type { Handler } from 'express';
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

const getEditPagesContentHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestEditPagesContentBodyValidator.parse(req.body);

			await editPageContent(requestBody);

			res.status(StatusCodes.OK).send({ message: 'Page content updated' });
		} catch (error) {
			next(error);
		}
	};
};

export { getEditPagesContentHandle, getPagesHandle };
