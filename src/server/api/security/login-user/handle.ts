import { comparePassword } from '../../../modules/protection/hash-password.js';
import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { RequestBodyValidator } from './request.js';
import { signJwtToken } from '../../../modules/protection/jwt-handling.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const loginUserHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestBodyValidator.parse(req.body);

			const repository = dataSource.getRepository(User);
			const user = await repository.findOne({
				where: { email: requestBody.email },
			});

			if (!user?.active) throw new ForbiddenException('User/Password not match or wrong credentials');

			const isValidPassword = await comparePassword(
				requestBody.password,
				user.password,
			);
			if (!isValidPassword) throw new ForbiddenException('User/Password not match or wrong credentials');

			const token = await signJwtToken({ role: user.role, userId: user.identifier });
			res.status(StatusCodes.OK).send({ token });
		} catch (error) {
			next(error);
		}
	};
};

export { loginUserHandle };
