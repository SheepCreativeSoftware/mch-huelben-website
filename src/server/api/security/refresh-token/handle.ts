import { decryptData, encryptData } from '../../../modules/protection/encryption.js';
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
			const currentEncryptedRefreshToken = req.cookies['refresh-token'];
			if (!currentEncryptedRefreshToken) {
				res.status(StatusCodes.NO_CONTENT).send({ message: 'No refresh token found' });
				return;
			}

			const currentRefreshToken = decryptData(currentEncryptedRefreshToken);

			const decoded = await verifyJwtRefreshToken(currentRefreshToken);

			const userRepository = dataSource.getRepository(User);
			const userEntity = await userRepository.findOneBy({ identifier: decoded.userId });
			if (!userEntity) throw new ForbiddenException('User not found');

			const refreshTokenRepository = dataSource.getRepository(RefreshToken);
			const currentRefreshTokenEntity = await refreshTokenRepository.findOne({
				where: { token: currentEncryptedRefreshToken, user: userEntity },
			});
			if (!currentRefreshTokenEntity) throw new ForbiddenException('Refresh token is invalid');

			const newRefreshToken = await signJwtRefreshToken({ userId: userEntity.identifier });
			const encryptedNewRefreshToken = encryptData(newRefreshToken);
			const accessToken = await signJwtAccessToken({ role: userEntity.role, userId: userEntity.identifier });
			const newRefreshTokenEntity = refreshTokenRepository.create({ token: encryptedNewRefreshToken, user: userEntity });
			await refreshTokenRepository.save(newRefreshTokenEntity);

			res.status(StatusCodes.OK)
				.cookie('refresh-token', encryptedNewRefreshToken, getRefreshCookieOptions())
				.send({ message: 'Refresh token updated', token: accessToken });

			setTimeout(async () => {
				// This should prevent a race condition
				await refreshTokenRepository.remove(currentRefreshTokenEntity);
			}, REMOVAL_TIMEOUT);
		} catch (error) {
			// eslint-disable-next-line no-undefined -- Expire does not make sense when clearing cookie
			res.clearCookie('refresh-token', { ...getRefreshCookieOptions(), expires: undefined });
			next(error);
		}
	};
};

export { getRefreshTokenHandle };
