import { checkAuthenticated, checkNotAuthenticated } from './modules/passport/checkAuthenticated.mjs';
import { buntstift } from 'buntstift';
import { defaults } from './modules/defaults.mjs';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { expressLogger } from './modules/expressLogger.mjs';
import { getNavLinks } from './modules/database/getNavLinks.mjs';
import passport from 'passport';
import { sendErrorPage } from './modules/sendErrorPage.mjs';
import session from 'express-session';
import { userLoginRouter } from './routes/user/login.mjs';
const app = express();
// Set path for production or development - Static is not needed in production
let defaultPath = './';
if (process.env.NODE_ENV === 'development') {
    defaultPath = './dist/';
    app.use(express.static(defaultPath + 'public'));
    buntstift.configure(buntstift.getConfiguration().withVerboseMode(true));
}
// Setup ejs support in express
app.set('view engine', 'ejs');
app.set('views', defaultPath + 'views');
// Setup ejs layouts support in express
app.use(expressLayouts);
app.set('layout', 'layout/default');
// Setup body parser for specific types
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Setup basic middlewares
if (typeof process.env.SESSION_SECRET === 'undefined')
    throw new Error('Missing Session Secret');
const sessionCookie = {
    cookie: {
        httpOnly: true,
        maxAge: 600_000,
        sameSite: 'strict',
    },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
};
if (process.env.NODE_ENV === 'development') {
    // Trust first proxy (ngnix)
    app.set('trust proxy', true);
    if (sessionCookie.cookie)
        sessionCookie.cookie.secure = false;
}
app.use(session(sessionCookie));
app.use(passport.initialize());
app.use(passport.session());
// Setup public routes
app.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index', {
        author: 'mch-huelben',
        message: 'Hi Marina',
        meta: 'Eisenbahn',
        naviLinks: getNavLinks('none', '/'),
        title: 'Home',
    });
    expressLogger('success', req, res);
});
app.use('/user', userLoginRouter);
// Setup restricted routes
// TODO: Add csrf code here, later
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', {
        author: 'mch-huelben',
        message: 'Hi Admin',
        meta: 'Eisenbahn',
        naviLinks: getNavLinks(req.user?.role, '/'),
        title: 'Home',
        userLoggedIn: req.isAuthenticated(),
    });
    expressLogger('success', req, res);
});
// Handle Error routes
app.use(function (req, res) {
    sendErrorPage(req, res, 'Not Found');
});
app.use(function (err, req, res) {
    expressLogger('error', req, res);
    if (err.stack)
        buntstift.error(err.stack);
    sendErrorPage(req, res, 'Internal Server Error');
});
app.listen(process.env.SERVER_PORT || defaults).on('listening', () => {
    buntstift.success(`Server started and is listening on Port ${process.env.SERVER_PORT || defaults}`);
});
