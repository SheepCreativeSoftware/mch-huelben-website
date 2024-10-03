import { ForbiddenException, InternalServerException, UnauthorizedException } from '../misc/custom-errors.js';
import type { Handler } from 'express';

const userAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (typeof req.isLoggedIn !== 'function') {
			next(new InternalServerException('isLoggedIn is not a function'));
			return;
		}
		if (req.isLoggedIn() === false) {
			next(new UnauthorizedException('User must be logged in'));
			return;
		}

		next();
	};
};

const userRoleAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (req.user?.role === 'User' || req.user?.role === 'Admin') {
			next();
			return;
		}

		next(new ForbiddenException('User has no access privilidges'));
	};
};

const adminRoleAuthorizedHandler = (): Handler => {
	return (req, _res, next) => {
		if (req.user?.role === 'Admin') {
			next();
			return;
		}

		next(new ForbiddenException('User has no access privilidges'));
	};
};

export {
	adminRoleAuthorizedHandler,
	userRoleAuthorizedHandler,
	userAuthorizedHandler,
};
