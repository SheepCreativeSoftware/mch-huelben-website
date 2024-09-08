import { buntstift } from 'buntstift';
import type { Handler } from 'express';
import { ForbiddenException, UnauthorizedException } from '../misc/customErrors';

const userAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (typeof req.isLoggedIn !== 'function') {
			buntstift.error('isLoggedIn is not a function');
			next(new Error('Internal Server Error')); return;
		}
		if (req.isLoggedIn() === false) {
			next(new UnauthorizedException('User must be logged in')); return;
		}

		next();
	};
};

const creatorAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (req.user?.role === 'Creator') {
			next(); return;
		}

		next(new ForbiddenException('User has no access privilidges'));
	};
};

const answererAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (req.user?.role === 'Answerer') {
			next(); return;
		}

		next(new ForbiddenException('User has no access privilidges'));
	};
};

const creatorOrAnswererAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (req.user?.role === 'Answerer' || req.user?.role === 'Creator') {
			next(); return;
		}

		next(new ForbiddenException('User has no access privilidges'));
	};
};

export {
	answererAuthorizedHandler,
	creatorAuthorizedHandler,
	creatorOrAnswererAuthorizedHandler,
	userAuthorizedHandler,
};
