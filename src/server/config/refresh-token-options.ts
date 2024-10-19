import type { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-magic-numbers -- 1 day in seconds
const REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24;

const getRefreshTokenExpirationInMilliSeconds = (): number => {
	return Math.floor(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME);
};

const getRefreshTokenCookieOptions = (expirationInMilliSeconds: number): CookieOptions => ({
	domain: process.env.HOST,
	expires: new Date(expirationInMilliSeconds),
	httpOnly: true,
	path: '/api/security',
	sameSite: 'strict',
	secure: isProduction,
});

export { getRefreshTokenExpirationInMilliSeconds, getRefreshTokenCookieOptions };
