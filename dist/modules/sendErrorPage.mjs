import { errorCodeDefaults } from './defaults/errorCodeDefaults.mjs';
import { expressLogger } from './expressLogger.mjs';
import { getNavLinks } from './database/getNavLinks.mjs';
const errorTemplate = {
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
const sendErrorPage = (req, res, errorCode) => {
    const copyTemplate = { ...errorTemplate };
    copyTemplate.error = errorCodeDefaults[errorCode];
    res.status(Number(copyTemplate.error.code)).render('error', copyTemplate);
    if (Number(copyTemplate.error.code) < serverError)
        expressLogger('warn', req, res);
    else
        expressLogger('error', req, res);
};
export { sendErrorPage };
