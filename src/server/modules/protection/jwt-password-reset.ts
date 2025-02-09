/* eslint-disable -- Ignore this file for now */
import { buntstift } from 'buntstift';

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { UUID } from 'node:crypto';

if (typeof process.env.JWT_SECRET === 'undefined') throw new Error('Missing JWT_SECRET enviroment variable');

const accessTokenSecretKey = process.env.JWT_SECRET;


type Payload = {
	userId: string | UUID;
};

const signPasswordResetToken = (options: Payload): Promise<string> => {
	const payload = {
		userId: options.userId,
		use: 'password-reset'
	} as Payload;

	const signOptions: jwt.SignOptions = {
		algorithm: 'HS256',
		issuer: process.env.HOST,
		jwtid: crypto.randomUUID(),
		expiresIn: '15m',
		subject: options.userId
	};

	return new Promise((resolve, reject) => {
		jwt.sign(payload, accessTokenSecretKey, signOptions, (error, jwt) => {
			if (error) {
				buntstift.error(error.message);
				reject(error);
				return;
			}

			if (typeof jwt === 'string') resolve(jwt);

			reject(new Error('JWT is not a string'));
		});
	});
};

const verifyPasswordResetToken = (token: string): Promise<{ userId: UUID }> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, accessTokenSecretKey, { issuer: process.env.HOST }, (error, payload) => {
			if (error) {
				buntstift.error(error.message);
				return reject(error);
			}
			if (typeof payload === 'undefined' || typeof payload === 'string') {
				return reject(new Error('JWT is not an object'));
			}

			return resolve({
				userId: payload.sub as UUID,
			});
		});
	});
};

export { signPasswordResetToken, verifyPasswordResetToken };
