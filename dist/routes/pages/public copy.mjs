import { buntstift } from 'buntstift';
import { checkNotAuthenticated } from '../../modules/passport/checkAuthenticated.mjs';
import express from 'express';
import { expressLogger } from '../../modules/expressLogger.mjs';
import { getMetaData } from '../../modules/database/getMetaData.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { sendErrorPage } from '../../modules/sendErrorPage.mjs';
// eslint-disable-next-line new-cap
const router = express.Router();
const basicTemplate = {
    CSRFToken: '',
    author: 'mch-huelben',
    meta: {
        description: '',
        keywords: '',
    },
    naviLinks: getNavLinks(),
    title: '',
    userLoggedIn: false,
};
/** Start page */
router.get('/', checkNotAuthenticated, (req, res) => {
    const copyTemplate = { ...basicTemplate };
    res.render('index', copyTemplate);
    expressLogger('success', req, res);
});
router.get('/pages/:page', checkNotAuthenticated, async (req, res) => {
    try {
        const page = req.params.page;
        const copyTemplate = { ...basicTemplate };
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
