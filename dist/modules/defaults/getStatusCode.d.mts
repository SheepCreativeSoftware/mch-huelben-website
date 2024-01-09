import { ErrorCodes } from '../../types/ErrorCodes.mjs';
import { SuccessCodes } from '../../types/SuccessCodes.mjs';
declare const getInfoStatusCode: (statusText: SuccessCodes) => number;
declare const getErrorStatusCode: (statusText: ErrorCodes) => number;
export { getErrorStatusCode, getInfoStatusCode };
