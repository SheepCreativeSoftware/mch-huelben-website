import {
	clientErrorHandler,
	errorHandler,
	logOnError,
	notFoundHandler,
} from '../modules/handler/errorHandlers.js';
import type { Application } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { getMainRouter } from './main-router.js';
import { getSSRRouter } from './ssr-router.js';
import sirv from 'sirv';

if (typeof process.env.URL === 'undefined') throw new Error('Missing URL enviroment parameter');

// Const url = process.env.URL;
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE ?? '/';

const getApi = async (): Promise<Application> => {
	const app = express();

	// Setup parsers for specific types
	app.use(express.json());
	app.use(cookieParser());

	if (isProduction) {
		// Trust first proxy (ngnix)
		app.set('trust proxy', true);
		app.use(compression());
		app.use(base, sirv('./dist/ssr/client', { extensions: [] }));
		app.use(base, sirv('./public', { extensions: [] }));
	}

	app.all('/api/*', getMainRouter());
	app.use(await getSSRRouter());

	// Setup cors protection

	/*
	 * App.use(cors({
	 * 	methods: ['GET', 'POST'],
	 * 	origin: [url],
	 * }));
	 */

	// Setup user authentification routes and authorization middleware

	// App.use(jwtAuthorizationHandler());

	// Setup Protected Routes

	// App.use(userAuthorizedHandler());

	// Handle errors
	app.use(logOnError);
	app.use(notFoundHandler);
	app.use(clientErrorHandler);
	app.use(errorHandler);

	return app;
};

export { getApi };