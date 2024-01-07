// eslint-disable-next-line no-shadow
import { NextFunction, Request, Response } from 'express';


// eslint-disable-next-line consistent-return
const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if(req.isAuthenticated()) return next();
	return next('route');
};

// eslint-disable-next-line consistent-return
const checkNotAuthenticatedRedirect = (req: Request, res: Response, next: NextFunction) => {
	if(!req.isAuthenticated()) return next();
	res.redirect('/');
};

// eslint-disable-next-line consistent-return
const checkNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if(!req.isAuthenticated()) return next();
	return next('route');
};

// eslint-disable-next-line consistent-return
const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
	if(req.user?.role === 'admin') return next();
	return next('route');
};

export { checkAuthenticated, checkNotAuthenticated, checkIfAdmin, checkNotAuthenticatedRedirect };
