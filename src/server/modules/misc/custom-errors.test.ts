/* eslint-disable @typescript-eslint/no-floating-promises, no-magic-numbers -- This is a test file */
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	InternalServerException,
	NetworkException,
	NotFoundException,
	UnauthorizedException,
} from './custom-errors.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('custom-errors', () => {
	describe('BadRequestException', () => {
		it('should be an instance of Error and NetworkException', () => {
			const error = new BadRequestException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 400', () => {
			const error = new BadRequestException();
			assert.strictEqual(error.statusCode, 400);
		});
		it('should have a name of "Bad Request"', () => {
			const error = new BadRequestException();
			assert.strictEqual(error.name, 'Bad Request');
		});
	});
	describe('UnauthorizedException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new UnauthorizedException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 401', () => {
			const error = new UnauthorizedException();
			assert.strictEqual(error.statusCode, 401);
		});
		it('should have a name of "Unauthorized"', () => {
			const error = new UnauthorizedException();
			assert.strictEqual(error.name, 'Unauthorized');
		});
	});
	describe('ForbiddenException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new ForbiddenException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 403', () => {
			const error = new ForbiddenException();
			assert.strictEqual(error.statusCode, 403);
		});
		it('should have a name of "Forbidden"', () => {
			const error = new ForbiddenException();
			assert.strictEqual(error.name, 'Forbidden');
		});
	});
	describe('NotFoundException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new NotFoundException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 404', () => {
			const error = new NotFoundException();
			assert.strictEqual(error.statusCode, 404);
		});
		it('should have a name of "Not Found"', () => {
			const error = new NotFoundException();
			assert.strictEqual(error.name, 'Not Found');
		});
	});
	describe('ConflictException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new ConflictException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 409', () => {
			const error = new ConflictException();
			assert.strictEqual(error.statusCode, 409);
		});
		it('should have a name of "Conflict"', () => {
			const error = new ConflictException();
			assert.strictEqual(error.name, 'Conflict');
		});
	});
	describe('InternalServerException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new InternalServerException();
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 500', () => {
			const error = new InternalServerException();
			assert.strictEqual(error.statusCode, 500);
		});
		it('should have a name of "Internal Server Error"', () => {
			const error = new InternalServerException();
			assert.strictEqual(error.name, 'Internal Server Error');
		});
	});
	describe('NetworkException and NetworkException', () => {
		it('should be an instance of Error', () => {
			const error = new NetworkException(500);
			assert.ok(error instanceof Error);
			assert.ok(error instanceof NetworkException);
		});
		it('should have a statusCode of 500', () => {
			const error = new NetworkException(500);
			assert.strictEqual(error.statusCode, 500);
		});
	});
});
