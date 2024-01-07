// eslint-disable-next-line consistent-return
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    return next('route');
};
// eslint-disable-next-line consistent-return
const checkNotAuthenticatedRedirect = (req, res, next) => {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/');
};
// eslint-disable-next-line consistent-return
const checkNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated())
        return next();
    return next('route');
};
export { checkAuthenticated, checkNotAuthenticated, checkNotAuthenticatedRedirect };
