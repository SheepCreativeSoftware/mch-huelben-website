import { checkAuthenticated, checkIfAdmin } from '../../modules/passport/checkAuthenticated.mjs';
import { getUsers, removeUser, setUser } from '../../modules/database/getUsers.mjs';
import { buntstift } from 'buntstift';
import express from 'express';
import { expressLogger } from '../../modules/expressLogger.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { sendErrorPage } from '../../modules/sendErrorPage.mjs';


// eslint-disable-next-line new-cap
const router = express.Router();

const basicTemplate = {
	CSRFToken: '',
	author: 'mch-huelben',
	meta: '',
	naviLinks: getNavLinks(),
	title: 'Benutzer-Verwaltung',
	userLoggedIn: false,
	users: [] as Express.User[],
};

/** List users on page */
router.get('/user', checkAuthenticated, checkIfAdmin, async (req, res) => {
	try {
		const copyTemplate = { ...basicTemplate };
		copyTemplate.naviLinks = getNavLinks(req.user?.role, '/management/user');
		copyTemplate.userLoggedIn = req.isAuthenticated();
		copyTemplate.users = await getUsers();
		if(typeof req.csrfToken === 'function') copyTemplate.CSRFToken = req.csrfToken();
		res.render('management/user', copyTemplate);
		expressLogger('success', req, res);
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		sendErrorPage(req, res, 'Internal Server Error');
	}
});

router.post('/user/addUser', checkAuthenticated, checkIfAdmin, async (req, res) => {
	try {
		await setUser({ email: req.body.email, name: req.body.name, role: req.body.role });
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return sendErrorPage(req, res, 'Forbidden');
	}

	return res.redirect('/management/user');
});

router.post('/user/removeUser', checkAuthenticated, checkIfAdmin, async (req, res) => {
	try {
		await removeUser({ email: req.body.email, name: req.body.name, role: req.body.role });
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return sendErrorPage(req, res, 'Forbidden');
	}

	return res.redirect('/management/user');
});

export { router as managementUserRouter };
