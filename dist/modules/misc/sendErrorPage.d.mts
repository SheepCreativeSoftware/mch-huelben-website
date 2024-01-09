import { Request, Response } from 'express';
import { ErrorCodes } from '../../types/ErrorCodes.mjs';
declare const sendErrorPage: (req: Request, res: Response, errorCode: ErrorCodes) => void;
export { sendErrorPage };
