// This is a modified version of CSRF-Sync from: https://github.com/Psifi-Solutions/csrf-sync - See also License file

/* eslint-disable no-shadow */
import type { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { sendErrorPage } from '../sendErrorPage.mjs';

declare module 'express-session' {
  export interface SessionData {
    csrfToken?: CsrfSyncedToken;
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    csrfToken?: (overwrite?: boolean) => ReturnType<CsrfTokenGenerator>;
  }
}

export type RequestMethod =
  | 'GET'
  | 'HEAD'
  | 'PATCH'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE';

export type CsrfSyncedToken = string | null | undefined;
export type CsrfRequestToken = string | undefined;
export type CsrfTokenStorer = (req: Request, token?: CsrfSyncedToken) => void;
export type CsrfTokenRetriever = (req: Request) => CsrfSyncedToken;
export type CsrfTokenGenerator = (req: Request, overwrite?: boolean) => string;
export type CsrfTokenRevoker = (req: Request) => void;
export type CsrfRequestValidator = (req: Request) => boolean;
export type CsrfSynchronisedProtection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export interface CsrfSyncOptions {
  ignoredMethods?: RequestMethod[];
  getTokenFromRequest?: CsrfTokenRetriever;
  getTokenFromState?: CsrfTokenRetriever;
  storeTokenInState?: CsrfTokenStorer;
  size?: number;
}

export interface CsrfSync {
  csrfSynchronisedProtection: CsrfSynchronisedProtection;
  generateToken: CsrfTokenGenerator;
  getTokenFromRequest: CsrfTokenRetriever;
  getTokenFromState: CsrfTokenRetriever;
  isRequestValid: CsrfRequestValidator;
  storeTokenInState: CsrfTokenStorer;
  revokeToken: CsrfTokenRevoker;
}

export const csrfSync = ({
	ignoredMethods = ['GET', 'HEAD', 'OPTIONS'],
	getTokenFromRequest = (req) => req.headers['x-csrf-token'] as CsrfRequestToken,
	getTokenFromState = (req) => {
		return req.session.csrfToken;
	},
	storeTokenInState = (req, token) => {
		req.session.csrfToken = token;
	},
	size = 128,
}: CsrfSyncOptions = {}): CsrfSync => {
	const ignoredMethodsSet = new Set(ignoredMethods);

	const generateToken: CsrfTokenGenerator = (req, overwrite = false) => {
		if(!overwrite && typeof getTokenFromState(req) === 'string') return getTokenFromState(req) as string;


		const newToken = randomBytes(size).toString('hex');
		storeTokenInState(req, newToken);

		return newToken;
	};

	const revokeToken: CsrfTokenRevoker = (req) => {
		storeTokenInState(req);
	};

	const isRequestValid: CsrfRequestValidator = (req) => {
		const receivedToken = getTokenFromRequest(req);
		const storedToken = getTokenFromState(req);

		return (
			typeof receivedToken === 'string' &&      typeof storedToken === 'string' &&      receivedToken === storedToken
		);
	};

	const csrfSynchronisedProtection: CsrfSynchronisedProtection = (
		req,
		res,
		next,
	) => {
		req.csrfToken = (overwrite) => generateToken(req, overwrite);

		if(ignoredMethodsSet.has(req.method as RequestMethod)) return next();

		const isCsrfValid = isRequestValid(req);
		if(!isCsrfValid) return sendErrorPage(req, res, 'Forbidden');

		return next();
	};

	return {
		csrfSynchronisedProtection,
		generateToken,
		getTokenFromRequest,
		getTokenFromState,
		isRequestValid,
		revokeToken,
		storeTokenInState,
	};
};
