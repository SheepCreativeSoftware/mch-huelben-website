import { getRefreshTokenCookieOptions, getRefreshTokenExpirationInMilliSeconds } from '../../../config/refresh-token-options.js';
import { signJwtAccessToken, signJwtRefreshToken, verifyJwtRefreshToken } from '../../../modules/protection/jwt-handling.js';
import { createHash } from '../../../modules/protection/encryption.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const CONVERT_TO_SECONDS = 1000;

const getRefreshTokenHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const currentRefreshToken = req.cookies['refresh-token'];
			if (!currentRefreshToken) {
				res.status(StatusCodes.NO_CONTENT).send({ message: 'No refresh token found' });
				return;
			}

			const decoded = await verifyJwtRefreshToken(currentRefreshToken);
			const currentHashedRefreshToken = createHash(currentRefreshToken);

			const userRepository = dataSource.getRepository(User);
			const userEntity = await userRepository.findOneBy({ identifier: decoded.userId });
			if (!userEntity) throw new ForbiddenException('User or Refresh Token not found or invalid');

			const refreshTokenRepository = dataSource.getRepository(RefreshToken);
			const currentRefreshTokenEntity = await refreshTokenRepository.findOne({
				where: { token: currentHashedRefreshToken, user: userEntity },
			});
			if (!currentRefreshTokenEntity) throw new ForbiddenException('User or Refresh Token not found or invalid');

			const expirationInMilliSeconds = getRefreshTokenExpirationInMilliSeconds();
			const tokenId = crypto.randomUUID();
			const newRefreshToken = await signJwtRefreshToken({
				expiration: expirationInMilliSeconds / CONVERT_TO_SECONDS,
				tokenId,
				userId: userEntity.identifier,
			});
			const newHashedRefreshToken = createHash(newRefreshToken);
			const newRefreshTokenEntity = refreshTokenRepository.create({
				expiration: new Date(expirationInMilliSeconds),
				identifier: tokenId,
				token: newHashedRefreshToken,
				user: userEntity,
			});
			await refreshTokenRepository.save(newRefreshTokenEntity);
			const accessToken = await signJwtAccessToken({ role: userEntity.role, userId: userEntity.identifier });

			process.nextTick(async () => {
				// This should prevent a race condition where multiple requests are made at the same time
				await refreshTokenRepository.remove(currentRefreshTokenEntity);
			});

			res.status(StatusCodes.OK)
				.cookie('refresh-token', newRefreshToken, getRefreshTokenCookieOptions(expirationInMilliSeconds))
				.send({ message: 'Refresh token updated', token: accessToken });
		} catch (error) {
			// eslint-disable-next-line no-undefined -- Expire does not make sense when clearing cookie
			res.clearCookie('refresh-token', { ...getRefreshTokenCookieOptions(0), expires: undefined });
			next(error);
		}
	};
};

export { getRefreshTokenHandle };
