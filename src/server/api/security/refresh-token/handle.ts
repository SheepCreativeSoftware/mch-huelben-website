import { signJwtAccessToken, signJwtRefreshToken, verifyJwtRefreshToken } from '../../../modules/protection/jwt-handling.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import { getRefreshCookieOptions } from '../../../config/refresh-cookie-options.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const getRefreshTokenHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) {
				res.status(StatusCodes.OK).send({ message: 'No refresh token found' });
				return;
			}

			const decoded = await verifyJwtRefreshToken(refreshToken);

			const userRepository = dataSource.getRepository(User);
			const userEntity = await userRepository.findOneBy({ identifier: decoded.userId });
			if (!userEntity) throw new ForbiddenException('User not found');

			const repositoryRefreshTokenRepository = dataSource.getRepository(RefreshToken);
			const refreshTokenEntity = await repositoryRefreshTokenRepository.findOne({
				where: { token: refreshToken, user: userEntity },
			});
			if (!refreshTokenEntity) throw new ForbiddenException('Refresh token is invalid');

			const newRefreshToken = await signJwtRefreshToken({ userId: userEntity.identifier });
			refreshTokenEntity.token = newRefreshToken;
			await repositoryRefreshTokenRepository.save(refreshTokenEntity);

			const accessToken = await signJwtAccessToken({ role: userEntity.role, userId: userEntity.identifier });

			res.status(StatusCodes.OK)
				.cookie('refreshToken', newRefreshToken, getRefreshCookieOptions())
				.send({ message: 'Refresh token updated', token: accessToken });
		} catch (error) {
			next(error);
		}
	};
};

export { getRefreshTokenHandle };
