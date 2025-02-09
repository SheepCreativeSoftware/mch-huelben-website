import { dataSource } from '../../../database/datasource.js';
import type { Handler } from 'express';
import { RequestBodyValidator } from './request.js';
import { sendPasswordResetEmail } from '../../../modules/email/send-password-reset-email.js';
import { signPasswordResetToken } from '../../../modules/protection/jwt-password-reset.js';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../database/entities/User.js';

const requestPasswordResetHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestBodyValidator.parse(req.body);

			const repositoryUser = dataSource.getRepository(User);
			const user = await repositoryUser.findOne({
				where: {
					active: true,
					email: requestBody.email,
				},
			});

			if (user != null) {
				const token = await signPasswordResetToken({ userId: user.identifier });
				await sendPasswordResetEmail({ email: user.email, token });
			}

			res.status(StatusCodes.OK).send({
				message: 'If the email is correct, you will receive an email with instructions to reset your password',
			});
		} catch (error) {
			next(error);
		}
	};
};

export { requestPasswordResetHandle };
