import { randomBytes } from 'crypto';
import { sendErrorPage } from '../sendErrorPage.mjs';
export const csrfSync = ({ ignoredMethods = ['GET', 'HEAD', 'OPTIONS'], getTokenFromRequest = (req) => req.headers['x-csrf-token'], getTokenFromState = (req) => {
    return req.session.csrfToken;
}, storeTokenInState = (req, token) => {
    req.session.csrfToken = token;
}, size = 128, } = {}) => {
    const ignoredMethodsSet = new Set(ignoredMethods);
    const generateToken = (req, overwrite = false) => {
        if (!overwrite && typeof getTokenFromState(req) === 'string')
            return getTokenFromState(req);
        const newToken = randomBytes(size).toString('hex');
        storeTokenInState(req, newToken);
        return newToken;
    };
    const revokeToken = (req) => {
        storeTokenInState(req);
    };
    const isRequestValid = (req) => {
        const receivedToken = getTokenFromRequest(req);
        const storedToken = getTokenFromState(req);
        return (typeof receivedToken === 'string' && typeof storedToken === 'string' && receivedToken === storedToken);
    };
    const csrfSynchronisedProtection = (req, res, next) => {
        req.csrfToken = (overwrite) => generateToken(req, overwrite);
        if (ignoredMethodsSet.has(req.method)) {
            next();
        }
        else {
            const isCsrfValid = isRequestValid(req);
            if (!isCsrfValid)
                return sendErrorPage(req, res, 'Forbidden');
            return next();
        }
        return sendErrorPage(req, res, 'Internal Server Error');
    };
    return {
        csrfSynchronisedProtection,
        generateToken,
        getTokenFromRequest,
        getTokenFromState,
        isRequestValid,
        revokeToken,
        storeTokenInState,
    };
};
