import { checkAuthenticated, checkNotAuthenticatedRedirect } from '../../modules/passport/checkAuthenticated.mjs';
import { buntstift } from 'buntstift';
import express from 'express';
import { expressLogger } from '../../modules/expressLogger.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { getUsers } from '../../modules/database/getUsers.mjs';
import { initialize } from '../../modules/passport/passport-config.mjs';
import passport from 'passport';
// eslint-disable-next-line new-cap
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user, done) => done(null, user.id));
// eslint-disable-next-line id-length
passport.deserializeUser((id, done) => {
    return done(null, getUsers().find((user) => user.id === id));
});
const magicLogin = initialize('/user/verify');
passport.use(magicLogin);
const loginTemplate = {
    author: 'mch-huelben',
    meta: 'Login',
    naviLinks: getNavLinks(),
    title: 'Login',
};
router.get('/login', checkNotAuthenticatedRedirect, (req, res) => {
    res.render('login', loginTemplate);
    expressLogger('success', req, res);
});
// This is where we POST to from the frontend
router.post('/login', (req, res, next) => {
    req.session.regenerate(function (err) {
        if (err)
            next(err);
        /*
         * Save the session before redirection to ensure page
         * load does not happen before session is saved
         */
        req.session.save((error) => {
            if (error)
                return next(error);
            return next();
        });
    });
}, magicLogin.send);
router.get('/verify', checkNotAuthenticatedRedirect, passport.authenticate('magiclogin', {
    failureRedirect: '/login',
    successRedirect: '/',
}));
router.get('/logout', checkAuthenticated, (req, res) => {
    req.logOut({ keepSessionInfo: false }, (err) => {
        if (err instanceof Error)
            buntstift.error(err.message);
        req.session.regenerate(() => {
            res.redirect('/user/login');
        });
    });
});
export { router as userLoginRouter };
