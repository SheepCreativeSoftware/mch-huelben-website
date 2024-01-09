import { errorCodeDefaults } from './errorCodeDefaults.mjs';
import { ErrorCodes } from '../../types/ErrorCodes.mjs';
import { successCodeDefaults } from './successCodeDefaults.mjs';
import { SuccessCodes } from '../../types/SuccessCodes.mjs';


const getInfoStatusCode = (statusText: SuccessCodes) => {
	return Number(successCodeDefaults[statusText].code);
};

const getErrorStatusCode = (statusText: ErrorCodes) => {
	return Number(errorCodeDefaults[statusText].code);
};

export { getErrorStatusCode, getInfoStatusCode };
