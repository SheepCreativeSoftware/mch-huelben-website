import { buntstift } from 'buntstift';
import { checkNotAuthenticated } from '../../modules/passport/checkAuthenticated.mjs';
import express from 'express';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getContent } from '../../modules/database/getContent.mjs';
import { getMetaData } from '../../modules/database/getMetaData.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { getSpecialContent } from './getSpecialContent.mjs';
import { sendErrorPage } from '../../modules/misc/sendErrorPage.mjs';
// eslint-disable-next-line new-cap
const router = express.Router();
const basicTemplate = {
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
    userLoggedIn: false,
};
const zero = 0;
/** Start page */
router.get('/', checkNotAuthenticated, async (req, res) => {
    try {
        const page = 'start';
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.naviLinks = getNavLinks('none', '/');
        const metaData = await getMetaData(page);
        if (metaData)
            copyTemplate.meta = metaData;
        copyTemplate.content = await getSpecialContent(await getContent(page));
        if (copyTemplate.content.length === zero)
            return sendErrorPage(req, res, 'Not Found');
        res.render('pages/public', copyTemplate);
        return expressLogger('success', req, res);
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        if (error instanceof Error && error.message === 'Unknown Page')
            return sendErrorPage(req, res, 'Not Found');
        return sendErrorPage(req, res, 'Internal Server Error');
    }
});
router.get('/pages/:page', checkNotAuthenticated, async (req, res) => {
    try {
        const page = req.params.page;
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.naviLinks = getNavLinks('none', `/pages/${page}`);
        const metaData = await getMetaData(page);
        if (metaData)
            copyTemplate.meta = metaData;
        copyTemplate.content = await getSpecialContent(await getContent(page));
        if (copyTemplate.content.length === zero)
            return sendErrorPage(req, res, 'Not Found');
        res.render('pages/public', copyTemplate);
        return expressLogger('success', req, res);
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        if (error instanceof Error && error.message === 'Unknown Page')
            return sendErrorPage(req, res, 'Not Found');
        return sendErrorPage(req, res, 'Internal Server Error');
    }
});
export { router as pagesPublicRouter };
