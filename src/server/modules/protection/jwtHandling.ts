/* eslint-disable -- Ignore this file for now */
import { buntstift } from 'buntstift';

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { UUID } from 'node:crypto';

if (typeof process.env.SESSION_SECRET === 'undefined') throw new Error('Missing SESSION_SECRET enviroment variable');

const secretKey = process.env.SESSION_SECRET;

type Payload = {
	role: 'User' | 'Admin';
	userId: string | UUID;
};

const signJwtToken = (options: Payload): Promise<string> => {
	const payload = {
		role: options.role,
		userId: options.userId,

	} as Payload;

	const signOptions: jwt.SignOptions = {
		algorithm: 'HS256',
		issuer: process.env.HOST,
		jwtid: crypto.randomUUID(),
		expiresIn: '1h',
		subject: options.userId,
	};

	return new Promise((resolve, reject) => {
		jwt.sign(payload, secretKey, signOptions, (error, jwt) => {
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

// Biome-ignore lint/correctness/noUndeclaredVariables: Is defined globaly in global.d.ts
const verifyJwtToken = (token: string): Promise<Express.User> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, { issuer: process.env.HOST }, (error, payload) => {
			if (error) {
				buntstift.error(error.message);
				return reject(error);
			}
			if (typeof payload === 'undefined' || typeof payload === 'string') {
				return reject(new Error('JWT is not an object'));
			}

			return resolve({
				role: payload.role,
				userId: payload.sub as UUID,
			});
		});
	});
};

export { signJwtToken, verifyJwtToken };
