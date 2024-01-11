import { getErrorStatusCode, getInfoStatusCode } from '../../modules/defaults/getStatusCode.mjs';
import { getMetaData, setMetaData } from '../../modules/database/getMetaData.mjs';
import { buntstift } from 'buntstift';
import { checkAuthenticated } from '../../modules/passport/checkAuthenticated.mjs';
import express from 'express';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
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
/** Start page */
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const page = 'start';
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.currentUrl = page;
        copyTemplate.naviLinks = getNavLinks(req.user?.role, '/');
        copyTemplate.userLoggedIn = req.isAuthenticated();
        if (typeof req.csrfToken === 'function')
            copyTemplate.CSRFToken = req.csrfToken();
        const metaData = await getMetaData(page);
        if (metaData)
            copyTemplate.meta = metaData;
        res.render('pages/restricted', copyTemplate);
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
router.get('/pages/:page', checkAuthenticated, async (req, res) => {
    try {
        const page = req.params.page;
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.currentUrl = page;
        copyTemplate.naviLinks = getNavLinks(req.user?.role, `/pages/${page}`);
        copyTemplate.userLoggedIn = req.isAuthenticated();
        if (typeof req.csrfToken === 'function')
            copyTemplate.CSRFToken = req.csrfToken();
        const metaData = await getMetaData(page);
        if (metaData)
            copyTemplate.meta = metaData;
        res.render('pages/restricted', copyTemplate);
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
router.post('/pages/:page/setMetaData', checkAuthenticated, async (req, res) => {
    try {
        const page = req.params.page;
        const metaData = {
            description: req.body.description,
            keywords: req.body.keywords,
            title: req.body.title,
        };
        await setMetaData({ metaData, page });
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        return res.status(getErrorStatusCode('Bad Request')).end();
    }
    return res.status(getInfoStatusCode('Created')).end();
});
export { router as pagesRestrictedRouter };
