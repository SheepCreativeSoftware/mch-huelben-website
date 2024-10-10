import { clientErrorHandler, errorHandler, logOnError, notFoundHandler } from '../modules/handler/errorHandlers.js';
import { contactRouter } from './contact/router.js';
import express from 'express';
import { newsRouter } from './store/router.js';
import type { Router } from 'express';
import { securityRouter } from './security/router.js';

const getMainRouter = (): Router => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	router.use(newsRouter);
	router.use(contactRouter);
	router.use(securityRouter);

	// Handle errors
	router.use(logOnError);
	router.use(notFoundHandler);
	router.use(clientErrorHandler);
	router.use(errorHandler);

	return router;
};

export { getMainRouter };
