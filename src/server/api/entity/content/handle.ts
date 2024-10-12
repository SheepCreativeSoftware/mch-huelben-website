import type { Handler } from 'express';
import { RequestUpdateContentBodyValidator } from './request.js';
import { sanitizeHtml } from '../../../../shared/protection/sanitize-html.js';
import { StatusCodes } from 'http-status-codes';
import { updateContent } from '../../../services/content-service.js';

const getUpdateContentHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestBody = RequestUpdateContentBodyValidator.parse(req.body);

			let htmlContent = requestBody.content;
			if (htmlContent) htmlContent = sanitizeHtml(htmlContent);
			await updateContent({ content: htmlContent, identifier: requestBody.identifier, title: requestBody.title });

			res.status(StatusCodes.OK).send({ message: 'Page content updated' });
		} catch (error) {
			next(error);
		}
	};
};

export { getUpdateContentHandle };
