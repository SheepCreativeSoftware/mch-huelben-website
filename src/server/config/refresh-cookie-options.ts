import type { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

// 1 days
// eslint-disable-next-line no-magic-numbers -- This is a constant
const EXPIRATION_TIME = 1000 * 60 * 60 * 24;
const getRefreshCookieOptions = (): CookieOptions => ({
	domain: process.env.HOST,
	expires: new Date(Date.now() + EXPIRATION_TIME),
	httpOnly: true,
	path: '/api/security',
	sameSite: 'strict',
	secure: isProduction,
});

export { getRefreshCookieOptions };
