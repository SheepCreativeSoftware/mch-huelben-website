import { checkAuthenticated, checkNotAuthenticated } from './modules/passport/checkAuthenticated.mjs';
// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { buntstift } from 'buntstift';
import { csrfSync } from './modules/misc/csfrSync.mjs';
import { defaults } from './modules/defaults.mjs';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { expressLogger } from './modules/expressLogger.mjs';
import { getNavLinks } from './modules/database/getNavLinks.mjs';
import { managementUserRouter } from './routes/management/user.mjs';
import passport from 'passport';
import { sendErrorPage } from './modules/sendErrorPage.mjs';
import session from 'express-session';
import { userLoginRouter } from './routes/user/login.mjs';

const startServer = () => {
	const app = express();

	// Set path for production or development - Static is not needed in production
	let defaultPath = './';
	if(process.env.NODE_ENV === 'development') {
		defaultPath = './dist/';
		app.use(express.static(defaultPath+'public'));
		buntstift.configure(buntstift.getConfiguration().withVerboseMode(true));
	}

	// Setup ejs support in express
	app.set('view engine', 'ejs');
	app.set('views', defaultPath+'views');

	// Setup ejs layouts support in express
	app.use(expressLayouts);
	app.set('layout', 'layout/default');

	// Setup body parser for specific types
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	// Setup basic middlewares
	if(typeof process.env.SESSION_SECRET === 'undefined') throw new Error('Missing Session Secret');
	const sessionCookie: session.SessionOptions = {
		cookie: {
			httpOnly: true,
			maxAge: 600_000,
		},
		resave: false,
		rolling: true,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
	};
	if(process.env.NODE_ENV === 'production') {
		// Trust first proxy (ngnix)
		app.set('trust proxy', true);
		if(sessionCookie.cookie) sessionCookie.cookie.secure = true;
	}

	app.use(session(sessionCookie));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/user', userLoginRouter);

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

	// Setup restricted routes
	const csrfSyncProtect = csrfSync({
		getTokenFromRequest: (req) =>  {
			if(req.is('application/x-www-form-urlencoded')) return req.body.CSRFToken;

			// If the incoming request is a multipart content type then get the token from the body.
			if(req.is('multipart')) return req.body.CSRFToken;

			// Otherwise use the header for all other request types
			return req.headers['x-csrf-token'];
		},
		ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
		size: 128,
	});


	app.use(csrfSyncProtect.csrfSynchronisedProtection);

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

	app.use('/management', managementUserRouter);


	// Handle Error routes
	app.use(function(req, res) {
		sendErrorPage(req, res, 'Not Found');
	});

	app.use(function(err: Error, req: Request, res: Response) {
		expressLogger('error', req, res);
		if(err.stack) buntstift.error(err.stack);
		sendErrorPage(req, res, 'Internal Server Error');
	});

	// Start Server
	app.listen(process.env.SERVER_PORT || defaults).on('listening', () => {
		buntstift.success(`Server started and is listening on Port ${process.env.SERVER_PORT || defaults}`);
	}).on('error', (error) => {
		buntstift.error(`Server failed because of ${error.message}`);
	});
};

export { startServer };
