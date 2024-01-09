import { errorCodeDefaults } from './errorCodeDefaults.mjs';
import { successCodeDefaults } from './successCodeDefaults.mjs';
const getInfoStatusCode = (statusText) => {
    return Number(successCodeDefaults[statusText].code);
};
const getErrorStatusCode = (statusText) => {
    return Number(errorCodeDefaults[statusText].code);
};
export { getErrorStatusCode, getInfoStatusCode };
