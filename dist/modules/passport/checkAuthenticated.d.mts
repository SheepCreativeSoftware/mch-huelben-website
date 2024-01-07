import { NextFunction, Request, Response } from 'express';
declare const checkAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
declare const checkNotAuthenticatedRedirect: (req: Request, res: Response, next: NextFunction) => void;
declare const checkNotAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
export { checkAuthenticated, checkNotAuthenticated, checkNotAuthenticatedRedirect };
