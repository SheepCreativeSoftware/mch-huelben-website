import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import { getRefreshCookieOptions } from '../../../config/refresh-cookie-options.js';
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

			const repositoryRefreshToken = dataSource.getRepository(RefreshToken);
			await repositoryRefreshToken.delete({ token: refreshToken, user: userEntity });

			// eslint-disable-next-line no-undefined -- Expire does not make sense when clearing cookie
			res.clearCookie('refresh-token', { ...getRefreshCookieOptions(), expires: undefined });
			res.status(StatusCodes.OK).send({ message: 'User logged out' });
		} catch (error) {
			next(error);
		}
	};
};

export { getLogoutUserHandle };
