import { BadRequestException } from '../misc/custom-errors.js';
import type { Handler } from 'express';
import { verifyJwtAccessToken } from './jwt-handling.js';

const jwtAuthorizationHandler = (): Handler => {
	return async (req, _res, next) => {
		let loginStatus = false;
		req.isLoggedIn = () => {
			return loginStatus;
		};

		const authHeader = req.headers.authorization;
		if (typeof authHeader === 'undefined') {
			// No token -> No login
			next();
			return;
		}

		const [authType, token] = authHeader.split(' ');
		if (authType !== 'Bearer') {
			next(new BadRequestException('Wrong Auth header'));
			return;
		}

		try {
			const user = await verifyJwtAccessToken(token);
			req.user = user;
			loginStatus = true;
			next();
		} catch {
			req.user = null;
			loginStatus = false;
		}
		next();
	};
};

export { jwtAuthorizationHandler };
