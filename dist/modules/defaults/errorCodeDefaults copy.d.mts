import { ErrorCodes } from '../../types/ErrorCodes.mjs';
import { ErrorRender } from '../../interfaces/ErrorRender.mjs';
type ErrorCodeDefaults = {
    [key in ErrorCodes]: ErrorRender;
};
declare const errorCodeDefaults: ErrorCodeDefaults;
export { errorCodeDefaults };
