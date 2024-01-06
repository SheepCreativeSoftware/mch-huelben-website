
// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { buntstift } from 'buntstift';
import { defaults } from './modules/defaults.mjs';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { expressLogger } from './modules/expressLogger.mjs';
import { getNavLinks } from './modules/database/getNavLinks.mjs';
import { sendErrorPage } from './modules/sendErrorPage.mjs';
import { userLoginRouter } from './routes/user/login.mjs';


const app = express();

// Set path for production or development - Static is not needed in production
let defaultPath = './';
if(process.env.NODE_ENV === 'development') {
	defaultPath = './dist/';
	app.use(express.static(defaultPath+'public'));
	buntstift.configure(buntstift.getConfiguration().withVerboseMode(true));
}

// Setup ejs view engine
app.set('view engine', 'ejs');
app.set('views', defaultPath+'views');
app.use(expressLayouts);
app.set('layout', 'layout/default');
app.use(express.urlencoded({ extended: false }));

// Setup basic middlewares


// Setup public routes
app.get('/', (req, res) => {
	res.render('index', {
		author: 'mch-huelben',
		message: 'Hi Marina',
		meta: 'Eisenbahn',
		naviLinks: getNavLinks(),
		title: 'Home',
	});
	expressLogger('success', req, res);
});

app.use('/user', userLoginRouter);




// Setup restricted routes

// Setup restricted csrf protected routes

// Handle Error routes
app.use(function(req, res) {
	sendErrorPage(req, res, 'Not Found');
});

app.use(function(err: Error, req: Request, res: Response) {
	expressLogger('error', req, res);
	if(err.stack) buntstift.error(err.stack);
	sendErrorPage(req, res, 'Internal Server Error');
});

app.listen(process.env.SERVER_PORT || defaults).on('listening', () => {
	buntstift.success(`Server started and is listening on Port ${process.env.SERVER_PORT || defaults}`);
});

