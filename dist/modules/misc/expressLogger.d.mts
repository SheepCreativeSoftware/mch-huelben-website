import { Request, Response } from 'express';
declare const expressLogger: (type: 'success' | 'warn' | 'error' | 'verbose' | 'info', req: Request, res: Response) => void;
export { expressLogger };
