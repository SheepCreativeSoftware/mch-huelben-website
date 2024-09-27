import { InternalServerException, NotFoundException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { PagesRepository } from '../../../database/repository/pages-repository.js';
import { RequestPagesQueryValidator } from './request.js';
import { ResponsePagesBodyValidator } from './response.js';
import { StatusCodes } from 'http-status-codes';

const getPagesHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestPagesQueryValidator.parse(req.query);

			const page = await PagesRepository.getPageContent(requestQuery.technicalName);
			if (!page) throw new NotFoundException(`Page ${requestQuery.technicalName} not found`);
			const results = ResponsePagesBodyValidator.safeParse(page);
			if (!results.success) throw new InternalServerException('Failed to validate response', { cause: results.error.errors });

			res.status(StatusCodes.ACCEPTED).send(results.data);
		} catch (error) {
			next(error);
		}
	};
};

export { getPagesHandle };
