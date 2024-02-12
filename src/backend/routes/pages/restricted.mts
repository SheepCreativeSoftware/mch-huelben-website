import { addContent, getContent, removeContent, setContent } from '../../modules/database/getContent.mjs';
// eslint-disable-next-line no-shadow
import express, { Request } from 'express';
import { getErrorStatusCode, getInfoStatusCode } from '../../modules/defaults/getStatusCode.mjs';
import { getMetaData, setMetaData } from '../../modules/database/getMetaData.mjs';
import { buntstift } from 'buntstift';
import { checkAuthenticated } from '../../modules/passport/checkAuthenticated.mjs';
import { ContentType } from '../../types/ContentType.mjs';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { getSpecialContent } from './getSpecialContent.mjs';
import { MetaDataDB } from '../../interfaces/MetaDataDB.mjs';
import { PagesTemplate } from '../../interfaces/renderer/PagesTemplate.mjs';
import { sendErrorPage } from '../../modules/misc/sendErrorPage.mjs';
import { UUID } from 'crypto';

// eslint-disable-next-line new-cap
const router = express.Router();

const basicTemplate: PagesTemplate = {
	CSRFToken: '',
	author: 'mch-huelben',
	content: [],
	currentUrl: '',
	dateOptions: { dateStyle: 'long', timeStyle: 'short' },
	meta: {
		description: '',
		keywords: '',
		title: '',
	},
	naviLinks: getNavLinks(),
	newsContent: [],
	newsCount: 0,
	userLoggedIn: false,
};

const createContentData = async (req: Request, page: string, path: string) => {
	const copyTemplate = JSON.parse(JSON.stringify(basicTemplate)) as PagesTemplate;
	copyTemplate.currentUrl = page;
	copyTemplate.naviLinks = getNavLinks(req.user?.role, path);
	copyTemplate.userLoggedIn = req.isAuthenticated();
	copyTemplate.adminLoggedIn = req.user?.role === 'admin';
	if(typeof req.csrfToken === 'function') copyTemplate.CSRFToken = req.csrfToken();
	const metaData = await getMetaData(page);
	if(metaData) copyTemplate.meta = metaData;
	copyTemplate.content = await getSpecialContent(await getContent(page));
	return copyTemplate;
};


/** Start page */
router.get('/', checkAuthenticated, async (req, res) => {
	try {
		const page = 'start';
		const copyTemplate = await createContentData(req, page, '/');

		res.render(`pages/restricted/${page}`, copyTemplate, (error, html) => {
			if(error) throw error;
			return res.status(getInfoStatusCode('Accepted')).send(html);
		});
		return expressLogger('success', req, res);
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(error.message);
			if(error.message.includes('Failed to lookup view')) return sendErrorPage(req, res, 'Not Found');
		}
		return sendErrorPage(req, res, 'Internal Server Error');
	}
});

// News page must be in here later
router.get('/pages/news', checkAuthenticated, async (req, res) => {
	try {
		const page = 'news';
		const copyTemplate = await createContentData(req, page, `/pages/${page}`);
		// TODO: Get news content and add it here into the template

		res.render(`pages/restricted/${page}`, copyTemplate, (error, html) => {
			if(error) throw error;
			return res.status(getInfoStatusCode('Accepted')).send(html);
		});
		return expressLogger('success', req, res);
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(error.message);
			if(error.message.includes('Failed to lookup view')) return sendErrorPage(req, res, 'Not Found');
		}
		return sendErrorPage(req, res, 'Internal Server Error');
	}
});

router.get('/pages/:page', checkAuthenticated, async (req, res) => {
	try {
		const page = req.params.page;
		const copyTemplate = await createContentData(req, page, `/pages/${page}`);

		res.render(`pages/restricted/${page}`, copyTemplate, (error, html) => {
			if(error) throw error;
			return res.status(getInfoStatusCode('Accepted')).send(html);
		});
		return expressLogger('success', req, res);
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(error.message);
			if(error.message.includes('Failed to lookup view')) return sendErrorPage(req, res, 'Not Found');
		}
		return sendErrorPage(req, res, 'Internal Server Error');
	}
});

router.post('/pages/:page/setMetaData', checkAuthenticated, async (req, res) => {
	try {
		const page = req.params.page;
		const metaData: MetaDataDB = {
			description: req.body.description,
			keywords: req.body.keywords,
			title: req.body.title,
		};
		await setMetaData({ metaData, page });
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.status(getInfoStatusCode('Created')).end();
});

router.post('/pages/:page/addPageContent', checkAuthenticated, async (req, res) => {
	const page = req.params.page;
	try {
		// eslint-disable-next-line id-length
		const type = req.body.type as ContentType;
		await addContent(page, type);
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.redirect(`/pages/${page}`);
});

router.post('/pages/:page/updatePageContent', checkAuthenticated, async (req, res) => {
	try {
		const page = req.params.page;
		const content = req.body.content;
		const type = req.body.type as ContentType;
		// eslint-disable-next-line id-length
		const id = req.body.id as UUID;
		await setContent(page, type, content, id);
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.status(getInfoStatusCode('Created')).end();
});

router.post('/pages/:page/removePageContent', checkAuthenticated, async (req, res) => {
	const page = req.params.page;
	try {
		// eslint-disable-next-line id-length
		const id = req.body.id as UUID;
		await removeContent(page, id);
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.redirect(`/pages/${page}`);
});

export { router as pagesRestrictedRouter };