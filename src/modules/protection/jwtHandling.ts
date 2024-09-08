/* eslint-disable */
import { buntstift } from 'buntstift';

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { UUID } from 'node:crypto';

if (typeof process.env.SESSION_SECRET === 'undefined') throw new Error('Missing SESSION_SECRET enviroment variable');

const secretKey = process.env.SESSION_SECRET;

type Payload =
	| {
		role: 'Creator';
	}
	| {
		role: 'Answerer';
		surveyId: UUID;
		endDate: string;
		exp: number;
	};

const signJwtToken = (options:
	| { role: 'Creator'; userId: UUID | string }
	| { role: 'Answerer'; surveyId: UUID; endDate: Date }): Promise<string> => {
	const payload = {
		role: options.role,
	} as Payload;

	const signOptions: jwt.SignOptions = {
		algorithm: 'HS256',
		issuer: process.env.HOST,
		jwtid: crypto.randomUUID(),
	};

	// Check both otherwise typescript will not understand
	if (options.role === 'Answerer' && payload.role === 'Answerer') {
		payload.surveyId = options.surveyId;
		payload.endDate = options.endDate.toISOString();

		// Expiration of Answerer token is based on the end of a survey + 14 days
		payload.exp = options.endDate.getTime() / 1000 + 14 * 24 * 60 * 60;
	}

	if (options.role === 'Creator' && payload.role === 'Creator') {
		signOptions.expiresIn = '30m';
		signOptions.subject = options.userId;
	}
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
				reject(error);
				return;
			}
			if (typeof payload === 'undefined' || typeof payload === 'string') {
				reject(new Error('JWT is not an object'));
				return;
			}

			if (payload.role === 'Creator') {
				resolve({
					role: payload.role,
					userId: payload.sub as UUID,
				});
				return;
			}

			if (payload.role === 'Answerer') {
				resolve({
					role: payload.role,
					surveyId: payload.surveyId,
					endDate: payload.endDate,
					answererId: payload.jti as UUID,
				});
			}
		});
	});
};

export { signJwtToken, verifyJwtToken };
