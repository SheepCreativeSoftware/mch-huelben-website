import {
	clientErrorHandler,
	errorHandler,
	logOnError,
	notFoundHandler,
} from '../modules/handler/error-handlers.js';
import type { Application } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { getCorsConfig } from '../config/cors-config.js';
import { getMainRouter } from './main-router.js';
import { getSSRRouter } from './ssr/ssr-router.js';
import { jwtAuthorizationHandler } from '../modules/protection/jwt-authorization.js';
import sirv from 'sirv';

if (typeof process.env.URL === 'undefined') throw new Error('Missing URL enviroment parameter');

// Const url = process.env.URL;
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE ?? '/';

const getApi = async (): Promise<Application> => {
	const app = express();

	// Setup cors protection
	app.use(cors(getCorsConfig()));

	// Setup parsers for specific types
	app.use(express.json());
	app.use(cookieParser());

	if (isProduction) {
		// Trust first proxy (ngnix)
		app.set('trust proxy', true);
		app.use(compression());
		app.use(base, sirv('./dist/ssr/client', { extensions: [] }));
	}

	if (process.env.PREVIEW === 'true') app.use(express.static('./public'));

	// Authorization if token is present
	app.use(jwtAuthorizationHandler());

	app.use('/api', getMainRouter());
	app.use(await getSSRRouter());

	// Handle errors
	app.use(logOnError);
	app.use(notFoundHandler);
	app.use(clientErrorHandler);
	app.use(errorHandler);

	return app;
};

export { getApi };
