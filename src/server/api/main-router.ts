import { clientErrorHandler, errorHandler, logOnError, notFoundHandler } from '../modules/handler/error-handlers.js';
import { contactRouter } from './contact/router.js';
import { entityRouter } from './entity/router.js';
import express from 'express';
import type { Router } from 'express';
import { securityRouter } from './security/router.js';

const getMainRouter = (): Router => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	router.use('/entity', entityRouter);
	router.use('/contact', contactRouter);
	router.use('/security', securityRouter);

	// Handle errors
	router.use(logOnError);
	router.use(notFoundHandler);
	router.use(clientErrorHandler);
	router.use(errorHandler);

	return router;
};

export { getMainRouter };
