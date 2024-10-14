import { signJwtAccessToken, signJwtRefreshToken } from '../../../modules/protection/jwt-handling.js';
import { comparePassword } from '../../../modules/protection/hash-password.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import { getRefreshCookieOptions } from '../../../config/refresh-cookie-options.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { RequestBodyValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const loginUserHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestBodyValidator.parse(req.body);

			const repositoryUser = dataSource.getRepository(User);
			const user = await repositoryUser.findOne({
				where: { email: requestBody.email },
			});

			if (!user?.active) throw new ForbiddenException('User/Password not match or wrong credentials');

			const isValidPassword = await comparePassword(
				requestBody.password,
				user.password,
			);
			if (!isValidPassword) throw new ForbiddenException('User/Password not match or wrong credentials');

			const accessToken = await signJwtAccessToken({ role: user.role, userId: user.identifier });
			const refreshToken = await signJwtRefreshToken({ userId: user.identifier });

			const repositoryRefreshToken = dataSource.getRepository(RefreshToken);
			await repositoryRefreshToken.save({
				token: refreshToken,
				user,
			});

			res.status(StatusCodes.OK).cookie('refresh-token', refreshToken, getRefreshCookieOptions()).send({ token: accessToken });
		} catch (error) {
			next(error);
		}
	};
};

export { loginUserHandle };
