// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { errorCodeDefaults } from './defaults/errorCodeDefaults.mjs';
import { ErrorCodes } from '../types/ErrorCodes.mjs';
import { expressLogger } from './expressLogger.mjs';
import { getNavLinks } from './database/getNavLinks.mjs';
import { RendererTemplate } from '../interfaces/RendererTemplate.mjs';

const errorTemplate: RendererTemplate = {
	author: 'mch-huelben',
	error: {
		code: '',
		description: '',
		header: '',
		text: '',
	},
	meta: 'Eisenbahn',
	naviLinks: getNavLinks(),
	title: 'Error',
};

const serverError = 500;

const sendErrorPage = (req: Request, res: Response, errorCode: ErrorCodes) => {
	const copyTemplate = { ...errorTemplate };
	copyTemplate.error = errorCodeDefaults[errorCode];
	copyTemplate.userLoggedIn = req.isAuthenticated();
	copyTemplate.naviLinks = getNavLinks(req.user?.role);
	res.status(Number(copyTemplate.error.code)).render('error', copyTemplate);
	if(Number(copyTemplate.error.code) < serverError) expressLogger('warn', req, res);
	else expressLogger('error', req, res);
};

export { sendErrorPage };
