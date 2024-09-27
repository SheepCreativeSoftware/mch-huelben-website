import type { Handler } from 'express';
import { InternalServerException } from '../../../modules/misc/custom-errors.js';
import { NewsRepository } from '../../../database/repository/news-repository.js';
import { RequestNewsQueryValidator } from './request.js';
import { ResponseNewsBodyValidator } from './response.js';
import { StatusCodes } from 'http-status-codes';

const getNewsHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestNewsQueryValidator.parse(req.query);

			const news = await NewsRepository.getLatestNews(requestQuery.count, requestQuery.offset);
			const results = ResponseNewsBodyValidator.safeParse({ ...news, offset: requestQuery.offset ?? 0 });
			if (!results.success) throw new InternalServerException('Failed to validate response', { cause: results.error.errors });

			res.status(StatusCodes.ACCEPTED).send(results.data);
		} catch (error) {
			next(error);
		}
	};
};

export { getNewsHandle };
