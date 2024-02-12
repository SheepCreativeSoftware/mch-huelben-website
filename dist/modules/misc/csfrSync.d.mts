import type { NextFunction, Request, Response } from 'express';
declare module 'express-session' {
    interface SessionData {
        csrfToken?: CsrfSyncedToken;
    }
}
declare module 'express-serve-static-core' {
    interface Request {
        csrfToken?: (overwrite?: boolean) => ReturnType<CsrfTokenGenerator>;
    }
}
export type RequestMethod = 'GET' | 'HEAD' | 'PATCH' | 'PUT' | 'POST' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';
export type CsrfSyncedToken = string | null | undefined;
export type CsrfRequestToken = string | undefined;
export type CsrfTokenStorer = (req: Request, token?: CsrfSyncedToken) => void;
export type CsrfTokenRetriever = (req: Request) => CsrfSyncedToken;
export type CsrfTokenGenerator = (req: Request, overwrite?: boolean) => string;
export type CsrfTokenRevoker = (req: Request) => void;
export type CsrfRequestValidator = (req: Request) => boolean;
export type CsrfSynchronisedProtection = (req: Request, res: Response, next: NextFunction) => void;
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
export declare const csrfSync: ({ ignoredMethods, getTokenFromRequest, getTokenFromState, storeTokenInState, size, }?: CsrfSyncOptions) => CsrfSync;