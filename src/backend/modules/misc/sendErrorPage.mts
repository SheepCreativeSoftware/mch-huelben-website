// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { errorCodeDefaults } from '../defaults/errorCodeDefaults.mjs';
import { ErrorCodes } from '../../types/ErrorCodes.mjs';
import { ErrorRender } from '../../interfaces/ErrorRender.mjs';
import { expressLogger } from './expressLogger.mjs';
import { getNavLinks } from '../database/getNavLinks.mjs';
import { RendererTemplate } from '../../interfaces/RendererTemplate.mjs';

interface ErrorTemplate extends RendererTemplate {
	error: ErrorRender,
}

const errorTemplate: ErrorTemplate = {
	author: 'mch-huelben',
	error: {
		code: '',
		description: '',
		header: '',
		text: '',
	},
	meta: {
		description: '',
		keywords: '',
	},
	naviLinks: getNavLinks(),
	title: 'Error',
};

const serverError = 500;

const sendErrorPage = (req: Request, res: Response, errorCode: ErrorCodes) => {
	const copyTemplate = JSON.parse(JSON.stringify(errorTemplate)) as ErrorTemplate;
	copyTemplate.error = errorCodeDefaults[errorCode];
	copyTemplate.userLoggedIn = req.isAuthenticated();
	copyTemplate.naviLinks = getNavLinks(req.user?.role);
	copyTemplate.meta.description = `${errorCodeDefaults[errorCode].header} ${errorCodeDefaults[errorCode].code}`;
	copyTemplate.meta.keywords = `${errorCodeDefaults[errorCode].header} ${errorCodeDefaults[errorCode].code} -  MCH-H&uuml;lben e.V.`;
	copyTemplate.title = `${errorCodeDefaults[errorCode].code}`;
	res.status(Number(copyTemplate.error.code)).render('error', copyTemplate);
	if(Number(copyTemplate.error.code) < serverError) expressLogger('warn', req, res);
	else expressLogger('error', req, res);
};

export { sendErrorPage };
