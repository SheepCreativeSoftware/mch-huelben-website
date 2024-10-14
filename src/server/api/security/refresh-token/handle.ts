import { signJwtAccessToken, signJwtRefreshToken, verifyJwtRefreshToken } from '../../../modules/protection/jwt-handling.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import { getRefreshCookieOptions } from '../../../config/refresh-cookie-options.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const REMOVAL_TIMEOUT = 1000;

const getRefreshTokenHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const currentRefreshToken = req.cookies['refresh-token'];
			if (!currentRefreshToken) {
				res.status(StatusCodes.NO_CONTENT).send({ message: 'No refresh token found' });
				return;
			}

			const decoded = await verifyJwtRefreshToken(currentRefreshToken);

			const userRepository = dataSource.getRepository(User);
			const userEntity = await userRepository.findOneBy({ identifier: decoded.userId });
			if (!userEntity) throw new ForbiddenException('User not found');

			const refreshTokenRepository = dataSource.getRepository(RefreshToken);
			const refreshTokenEntity = await refreshTokenRepository.findOne({
				where: { token: currentRefreshToken, user: userEntity },
			});
			if (!refreshTokenEntity) {
				res.clearCookie('refresh-token');
				throw new ForbiddenException('Refresh token is invalid');
			}

			const newRefreshToken = await signJwtRefreshToken({ userId: userEntity.identifier });
			const accessToken = await signJwtAccessToken({ role: userEntity.role, userId: userEntity.identifier });
			const newRefreshTokenEntity = refreshTokenRepository.create({ token: newRefreshToken, user: userEntity });
			await refreshTokenRepository.save(newRefreshTokenEntity);

			res.status(StatusCodes.OK)
				.cookie('refresh-token', newRefreshToken, getRefreshCookieOptions())
				.send({ message: 'Refresh token updated', token: accessToken });

			setTimeout(async () => {
				// This should prevent a race condition
				await refreshTokenRepository.remove(refreshTokenEntity);
			}, REMOVAL_TIMEOUT);
		} catch (error) {
			next(error);
		}
	};
};

export { getRefreshTokenHandle };
