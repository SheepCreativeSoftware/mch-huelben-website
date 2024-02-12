import { checkAuthenticated, checkNotAuthenticatedRedirect } from '../../modules/passport/checkAuthenticated.mjs';
// eslint-disable-next-line no-shadow
import express, { NextFunction, Request, Response } from 'express';
import { buntstift } from 'buntstift';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { getUserById } from '../../modules/database/users/getUsers.mjs';
import { initialize } from '../../modules/passport/magicLoginStrategy.mjs';
import passport from 'passport';
import { RendererTemplate } from '../../interfaces/RendererTemplate.mjs';
import { sendErrorPage } from '../../modules/misc/sendErrorPage.mjs';

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => done(null, user.id));
// eslint-disable-next-line id-length
passport.deserializeUser(async (id: string, done) => {
	buntstift.verbose('deserializeUser');
	const user = await getUserById(id);
	return done(null, user);
});

const magicLogin = initialize('/user/verify');
passport.use(magicLogin);

const loginTemplate: RendererTemplate = {
	author: 'mch-huelben',
	meta: {
		description: 'Login Seite',
		keywords: 'Login',
		title: 'Login',
	},
	naviLinks: getNavLinks(),
};

router.get('/login', checkNotAuthenticatedRedirect, (req, res) => {
	res.render('login', loginTemplate);
	expressLogger('success', req, res);
});

// This is where we POST to from the frontend
router.post('/login', (req, res, next) => {
	req.session.regenerate(function (err) {
		if(err) next(err);

		/*
		 * Save the session before redirection to ensure page
		 * load does not happen before session is saved
		 */
		req.session.save((error) => {
			if(error) return next(error);
			return next();
		});
	});
}, magicLogin.send);

router.get('/verify', checkNotAuthenticatedRedirect, passport.authenticate('magiclogin', {
	failWithError: true,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}), (req: Request, res: Response, next: NextFunction) => {
	// Handle success
	return res.redirect('/user/login');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}, (err: Error, req: Request, res: Response, next: NextFunction) => {
	// Handle error
	return sendErrorPage(req, res, 'Unauthorized');
});

router.get('/logout', checkAuthenticated, (req, res) => {
	req.logOut({ keepSessionInfo: false }, (err)=>{
		if(err instanceof Error) buntstift.error(err.message);
		req.session.regenerate(() => {
			res.redirect('/user/login');
		});
	});
});

export { router as userLoginRouter };
