import { getRefreshTokenCookieOptions, getRefreshTokenExpirationInMilliSeconds } from '../../../config/refresh-token-options.js';
import { signJwtAccessToken, signJwtRefreshToken } from '../../../modules/protection/jwt-handling.js';
import { comparePasswordWithHash } from '../../../modules/protection/hash-password.js';
import { createHash } from '../../../modules/protection/encryption.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { RefreshToken } from '../../../database/entities/RefreshToken.js';
import { RequestBodyValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const CONVERT_TO_SECONDS = 1000;

const loginUserHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestBodyValidator.parse(req.body);

			const repositoryUser = dataSource.getRepository(User);
			const user = await repositoryUser.findOne({
				where: { email: requestBody.email },
			});

			if (!user?.active) throw new ForbiddenException('User/Password not match or wrong credentials');

			const isValidPassword = await comparePasswordWithHash(
				requestBody.password,
				user.password,
			);
			if (!isValidPassword) throw new ForbiddenException('User/Password not match or wrong credentials');

			const accessToken = await signJwtAccessToken({ role: user.role, userId: user.identifier });
			const expirationInMilliSeconds = getRefreshTokenExpirationInMilliSeconds();
			const tokenId = crypto.randomUUID();
			const refreshToken = await signJwtRefreshToken({
				expiration: expirationInMilliSeconds / CONVERT_TO_SECONDS,
				tokenId,
				userId: user.identifier,
			});
			const hashedRefreshToken = createHash(refreshToken);

			const repositoryRefreshToken = dataSource.getRepository(RefreshToken);
			const refreshTokenEntity = repositoryRefreshToken.create({
				expiration: new Date(expirationInMilliSeconds),
				identifier: tokenId,
				token: hashedRefreshToken,
				user,
			});
			await repositoryRefreshToken.save(refreshTokenEntity);

			res.status(StatusCodes.OK)
				.cookie('refresh-token', refreshToken, getRefreshTokenCookieOptions(expirationInMilliSeconds))
				.send({ token: accessToken });
		} catch (error) {
			next(error);
		}
	};
};

export { loginUserHandle };
