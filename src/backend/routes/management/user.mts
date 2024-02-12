import { checkAuthenticated, checkIfAdmin } from '../../modules/passport/checkAuthenticated.mjs';
import { buntstift } from 'buntstift';
import express from 'express';
import { expressLogger } from '../../modules/misc/expressLogger.mjs';
import { getErrorStatusCode } from '../../modules/defaults/getStatusCode.mjs';
import { getNavLinks } from '../../modules/database/getNavLinks.mjs';
import { getUsers } from '../../modules/database/users/getUsers.mjs';
import { removeUser } from '../../modules/database/users/deleteUsers.mjs';
import { sendErrorPage } from '../../modules/misc/sendErrorPage.mjs';
import { setUser } from '../../modules/database/users/setUsers.mjs';
import { UserTemplate } from '../../interfaces/renderer/UserTemplate.mjs';


// eslint-disable-next-line new-cap
const router = express.Router();

const basicTemplate: UserTemplate = {
	CSRFToken: '',
	author: 'mch-huelben',
	meta: {
		description: '',
		keywords: '',
		title: 'Benutzer-Verwaltung',
	},
	naviLinks: getNavLinks(),
	userLoggedIn: false,
	users: [] as Express.User[],
};

/** List users on page */
router.get('/user', checkAuthenticated, checkIfAdmin, async (req, res) => {
	try {
		const copyTemplate = JSON.parse(JSON.stringify(basicTemplate)) as UserTemplate;
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
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.redirect('/management/user');
});

const onlyOne = 1;
router.post('/user/removeUser', checkAuthenticated, checkIfAdmin, async (req, res) => {
	try {
		if(await getUsers.length <= onlyOne) throw new Error('Cannot delete last user');
		await removeUser({ email: req.body.email, name: req.body.name, role: req.body.role });
	} catch (error) {
		if(error instanceof Error) buntstift.error(error.message);
		return res.status(getErrorStatusCode('Bad Request')).end();
	}

	return res.redirect('/management/user');
});

export { router as managementUserRouter };
