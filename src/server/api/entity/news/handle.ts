import { addNewsArticle, getAllLatestNews, getLatestNews, updateNewsArticle, updateNewsArticleActiveState } from '../../../services/news-service.js';
import {
	RequestAddNewsArticleBodyValidator,
	RequestNewsQueryValidator,
	RequestUpdateNewsArticleActiveStateBodyValidator,
	RequestUpdateNewsArticleBodyValidator,
} from './request.js';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getNewsHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestNewsQueryValidator.parse(req.query);

			let result = {};
			if (requestQuery.includeDisabled) result = await getAllLatestNews({ count: requestQuery.count, offset: requestQuery.offset });
			else result = await getLatestNews({ count: requestQuery.count, offset: requestQuery.offset });

			res.status(StatusCodes.OK).send(result);
		} catch (error) {
			next(error);
		}
	};
};

const getUpdateNewsArticleHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestUpdateNewsArticleBodyValidator.parse(req.body);

			await updateNewsArticle(requestBody);

			res.status(StatusCodes.OK).send({ message: 'News article updated' });
		} catch (error) {
			next(error);
		}
	};
};

const getUpdateNewsArticleActiveStateHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestUpdateNewsArticleActiveStateBodyValidator.parse(req.body);

			await updateNewsArticleActiveState(requestBody);

			res.status(StatusCodes.OK).send({ message: 'News article active state toggled' });
		} catch (error) {
			next(error);
		}
	};
};

const getAddNewsArticleHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestAddNewsArticleBodyValidator.parse(req.body);

			await addNewsArticle(requestBody);

			res.status(StatusCodes.CREATED).send({ message: 'News article added' });
		} catch (error) {
			next(error);
		}
	};
};

export { getAddNewsArticleHandle, getNewsHandle, getUpdateNewsArticleHandle, getUpdateNewsArticleActiveStateHandle };
