import { createHash } from '../../../modules/protection/encryption.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import { getRefreshTokenCookieOptions } from '../../../config/refresh-token-options.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const getLogoutUserHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const user = req.user;
			if (!user) throw new ForbiddenException('User is not logged in');

			const repositoryUser = dataSource.getRepository(User);
			const userEntity = repositoryUser.create({
				identifier: user.userId,
			});

			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) throw new ForbiddenException('No refresh token provided');
			const hashedRefreshToken = createHash(refreshToken);

			const repositoryRefreshToken = dataSource.getRepository(RefreshToken);
			await repositoryRefreshToken.delete({ token: hashedRefreshToken, user: userEntity });

			// eslint-disable-next-line no-undefined -- Expire is not valid when clearing cookie
			res.clearCookie('refresh-token', { ...getRefreshTokenCookieOptions(0), expires: undefined });
			res.status(StatusCodes.OK).send({ message: 'User logged out' });
		} catch (error) {
			// eslint-disable-next-line no-undefined -- Expire is not valid when clearing cookie
			res.clearCookie('refresh-token', { ...getRefreshTokenCookieOptions(0), expires: undefined });
			next(error);
		}
	};
};

export { getLogoutUserHandle };
