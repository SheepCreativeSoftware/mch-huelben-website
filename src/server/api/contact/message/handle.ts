import { BadRequestException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { RequestBodyContactFormValidator } from './request.js';
import { sendContactEmail } from '../../../modules/email/send-contact-email.js';
import { StatusCodes } from 'http-status-codes';

const getContactMessageHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const { GDPRAcknowledged, email, message, name, subject } = RequestBodyContactFormValidator.parse(req.body);

			if (!GDPRAcknowledged) throw new BadRequestException('GDPR acknowledgement is required');

			await sendContactEmail({ email, message, name, subject });

			res.status(StatusCodes.CREATED).send({ message: 'Message successfuly sended' });
		} catch (error) {
			next(error);
		}
	};
};

export { getContactMessageHandle };
