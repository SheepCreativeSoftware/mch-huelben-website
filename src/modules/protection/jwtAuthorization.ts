import { BadRequestException, UnauthorizedException } from '../misc/customErrors.js';
import type { Handler } from 'express';
import { verifyJwtToken } from './jwtHandling.js';

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
			const user = await verifyJwtToken(token);
			req.user = user;
			loginStatus = true;
			next();
		} catch (error) {
			if (error instanceof Error) {
				next(new UnauthorizedException(`Invalid Token: ${error.message}`));
				return;
			}

			next(error);
		}
	};
};

export { jwtAuthorizationHandler };
