import { errorCodeDefaults } from '../defaults/errorCodeDefaults.mjs';
import { expressLogger } from './expressLogger.mjs';
import { getNavLinks } from '../database/getNavLinks.mjs';
const errorTemplate = {
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
        title: 'Error',
    },
    naviLinks: getNavLinks(),
};
const serverError = 500;
const sendErrorPage = (req, res, errorCode) => {
    const copyTemplate = JSON.parse(JSON.stringify(errorTemplate));
    copyTemplate.error = errorCodeDefaults[errorCode];
    copyTemplate.userLoggedIn = req.isAuthenticated();
    copyTemplate.naviLinks = getNavLinks(req.user?.role);
    copyTemplate.meta = {
        description: `${errorCodeDefaults[errorCode].header} ${errorCodeDefaults[errorCode].code}`,
        keywords: `${errorCodeDefaults[errorCode].header} ${errorCodeDefaults[errorCode].code} -  MCH-H&uuml;lben e.V.`,
        title: `${errorCodeDefaults[errorCode].code}`,
    };
    res.status(Number(copyTemplate.error.code)).render('error', copyTemplate);
    if (Number(copyTemplate.error.code) < serverError)
        expressLogger('warn', req, res);
    else
        expressLogger('error', req, res);
};
export { sendErrorPage };
