import { buntstift } from 'buntstift';
import { checkNotAuthenticated } from '../../modules/passport/checkAuthenticated.mjs';
import express from 'express';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getMetaData } from '../../modules/database/getMetaData.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { sendErrorPage } from '../../modules/misc/sendErrorPage.mjs';
// eslint-disable-next-line new-cap
const router = express.Router();
const basicTemplate = {
    CSRFToken: '',
    author: 'mch-huelben',
    currentUrl: '',
    meta: {
        description: '',
        keywords: '',
    },
    naviLinks: getNavLinks(),
    title: '',
    userLoggedIn: false,
};
/** Start page */
router.get('/', checkNotAuthenticated, async (req, res) => {
    try {
        const page = 'start';
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.naviLinks = getNavLinks('none', '/');
        const metaData = await getMetaData(page);
        if (metaData) {
            copyTemplate.meta.description = metaData.description;
            copyTemplate.meta.keywords = metaData.keywords;
            copyTemplate.title = metaData.title;
        }
        res.render('pages/normal', copyTemplate);
        expressLogger('success', req, res);
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        sendErrorPage(req, res, 'Internal Server Error');
    }
});
router.get('/pages/:page', checkNotAuthenticated, async (req, res) => {
    try {
        const page = req.params.page;
        const copyTemplate = JSON.parse(JSON.stringify(basicTemplate));
        copyTemplate.naviLinks = getNavLinks('none', `/pages/${page}`);
        const metaData = await getMetaData(page);
        if (metaData) {
            copyTemplate.meta.description = metaData.description;
            copyTemplate.meta.keywords = metaData.keywords;
            copyTemplate.title = metaData.title;
        }
        res.render('pages/normal', copyTemplate);
        expressLogger('success', req, res);
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        sendErrorPage(req, res, 'Internal Server Error');
    }
});
export { router as pagesPublicRouter };
