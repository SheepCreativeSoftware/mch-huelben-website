import { buntstift } from 'buntstift';
import express from 'express';
import { expressLogger } from '../modules/expressLogger.mjs';
import { getUsers } from '../modules/database/getUsers.mjs';
import jwt from 'jsonwebtoken';
import { sendErrorPage } from '../modules/sendErrorPage.mjs';
import { sendMagicLinkEmail } from '../modules/mail/sendMagicLinkEmail.mjs';
// eslint-disable-next-line new-cap
const router = express.Router();
const loginTemplate = {
    author: 'mch-huelben',
    meta: 'Login',
    naviLinks: [
        {
            active: false,
            href: 'start',
            name: 'Start',
        },
        {
            active: true,
            href: 'start',
            name: 'Start',
        },
    ],
    title: 'Login',
};
// Setup public routes
router.get('/login', (req, res) => {
    res.render('login', loginTemplate);
    expressLogger('success', req, res);
});
router.post('/login', async (req, res) => {
    const user = getUsers().find((thisUser) => thisUser.email === req.body.email);
    const cloneTemplate = { ...loginTemplate };
    if (typeof user !== 'undefined') {
        try {
            if (!process.env.JWT_SECRET)
                throw new Error('Missing JWT Secret');
            const token = jwt.sign({ name: user.name, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            await sendMagicLinkEmail({ email: user.email, token });
        }
        catch (error) {
            if (error instanceof Error)
                buntstift.error(error.message);
            cloneTemplate.message = 'Fehler beim einloggen. Bitte versuche es noch einmal.';
            res.render('login', cloneTemplate);
            expressLogger('error', req, res);
            return;
        }
    }
    cloneTemplate.message = 'Prüfe deine E-mails, um dich einzuloggen.';
    res.render('login', cloneTemplate);
    expressLogger('success', req, res);
});
router.get('/verify', (req, res) => {
    const token = req.query.token;
    if (typeof token !== 'string')
        return sendErrorPage(req, res, 'Unauthorized');
    const cloneTemplate = { ...loginTemplate };
    try {
        if (!process.env.JWT_SECRET)
            throw new Error('Missing JWT Secret');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decodedToken !== 'object')
            throw new Error('Missing JWT user ID');
        const user = getUsers().find((thisUser) => thisUser.id === decodedToken.userId);
        if (typeof user === 'undefined')
            throw new Error(`Unkown User tried to login: ${JSON.stringify(decodedToken)}`);
        cloneTemplate.message = `Hi ${user.name}`;
        res.render('index', cloneTemplate);
        expressLogger('success', req, res);
        // eslint-disable-next-line consistent-return, no-useless-return
        return;
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
        return sendErrorPage(req, res, 'Unauthorized');
    }
});
export { router as userRouter };
