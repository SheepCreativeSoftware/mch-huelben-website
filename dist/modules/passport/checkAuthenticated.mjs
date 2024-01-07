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
// eslint-disable-next-line consistent-return
const checkIfAdmin = (req, res, next) => {
    if (req.user?.role === 'admin')
        return next();
    return next('route');
};
export { checkAuthenticated, checkNotAuthenticated, checkIfAdmin, checkNotAuthenticatedRedirect };
