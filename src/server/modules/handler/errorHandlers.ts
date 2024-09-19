import type { ErrorRequestHandler, Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { buntstift } from 'buntstift';
import { NetworkException } from '../misc/customErrors.js';
import { ZodError } from 'zod';

const logOnError: ErrorRequestHandler = (error, _req, _res, next) => {
	if (error instanceof Error) {
		buntstift.error(`${error.name}: ${error.message}`);
		if (error.stack) buntstift.error(error.stack);

		if (error.cause) buntstift.error(JSON.stringify(error.cause));
	}
	next(error);
};

// Handle unknown routes error
const notFoundHandler: Handler = (_req, res) => {
	res.status(StatusCodes.NOT_FOUND).send({
		error: ReasonPhrases.NOT_FOUND,
		statusCode: StatusCodes.NOT_FOUND,
	});
};

// Handle Client Errors in middlewares
const clientErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
	if (error instanceof ZodError) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.issues });
		return;
	}

	if (error instanceof NetworkException) {
		res.status(error.statusCode).send({
			error: error.name,
			// eslint-disable-next-line no-undefined -- undefined is a valid value
			message: error.message || undefined,
			statusCode: error.statusCode,
		});
		return;
	}

	next(error);
};

// Handle unexpected errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- error handler must have 4 parameters otherwise express seems to ignore it
const errorHandler: ErrorRequestHandler = (_err, _req, res, _next) => {
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
		error: ReasonPhrases.INTERNAL_SERVER_ERROR,
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
	});
};

export { errorHandler, clientErrorHandler, logOnError, notFoundHandler };
