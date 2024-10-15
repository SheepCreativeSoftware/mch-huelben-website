/* eslint-disable @typescript-eslint/no-floating-promises -- This is a test file */
import { comparePasswordWithHash, hashPassword } from './hash-password.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('hash-password', () => {
	describe('hashPassword', () => {
		it('should hash a password', async () => {
			const password = 'password';
			const hash = await hashPassword(password);
			assert.match(hash, /^\$2[ayb]\$.{56}$/);
		});
	});

	describe('comparePasswordWithHash', () => {
		it('should hash a password and successfully compare', async () => {
			const password = 'password';
			const hash = await hashPassword(password);
			const isSame = await comparePasswordWithHash(password, hash);
			assert.ok(isSame);
		});

		it('should hash a password and compare it with a wrong password', async () => {
			const password = 'password';
			const hash = await hashPassword(password);
			const isSame = await comparePasswordWithHash('wrong-password', hash);
			assert.ok(!isSame);
		});
	});
});
