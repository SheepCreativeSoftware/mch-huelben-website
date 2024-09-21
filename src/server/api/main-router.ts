import { clientErrorHandler, errorHandler, logOnError, notFoundHandler } from '../modules/handler/errorHandlers';
import express from 'express';
import { newsRouter } from './store/router';
import type { Router } from 'express';

const getMainRouter = (): Router => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	router.use(newsRouter);

	// Handle errors
	router.use(logOnError);
	router.use(notFoundHandler);
	router.use(clientErrorHandler);
	router.use(errorHandler);

	return router;
};

export { getMainRouter };
