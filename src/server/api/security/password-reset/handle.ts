import { dataSource } from '../../../database/datasource.js';
import { ForbiddenException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { hashPassword } from '../../../modules/protection/hash-password.js';
import { RequestBodyValidator } from './request.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';
import { verifyPasswordResetToken } from '../../../modules/protection/jwt-password-reset.js';

const passwordResetHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const { password, token } = RequestBodyValidator.parse(req.body);

			const { userId } = await verifyPasswordResetToken(token);

			const repositoryUser = dataSource.getRepository(User);
			const user = await repositoryUser.findOne({
				where: { identifier: userId },
			});

			if (!user?.active) throw new ForbiddenException('User not match or wrong credentials');

			const hashedPassword = await hashPassword(password);
			const updatedUser = repositoryUser.create({
				identifier: user.identifier,
				password: hashedPassword,
			});
			await repositoryUser.save(updatedUser);

			res.status(StatusCodes.OK).send({
				message: 'Password has been reset',
			});
		} catch (error) {
			next(error);
		}
	};
};

export { passwordResetHandle };
