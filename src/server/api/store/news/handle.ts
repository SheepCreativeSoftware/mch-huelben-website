import type { Handler } from 'express';
import { NewsRepository } from '../../../database/repository/news-repository.js';
import { RequestNewsQueryValidator } from './request.js';
import { ResponseNewsBodyValidator } from './response.js';
import { StatusCodes } from 'http-status-codes';

const getNewsHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestNewsQueryValidator.parse(req.query);

			const news = await NewsRepository.getLatestNews(requestQuery.count, requestQuery.offset);
			const totalCount = await NewsRepository.getNewsTotalCount();
			const results = ResponseNewsBodyValidator.parse({ news, offset: requestQuery.offset ?? 0, totalCount });

			res.status(StatusCodes.ACCEPTED).send(results);
		} catch (error) {
			next(error);
		}
	};
};

export { getNewsHandle };
