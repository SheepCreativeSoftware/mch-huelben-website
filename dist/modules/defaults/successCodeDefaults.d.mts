import { ErrorRender } from '../../interfaces/ErrorRender.mjs';
import { SuccessCodes } from '../../types/SuccessCodes.mjs';
type SuccessCodeDefaults = {
    [key in SuccessCodes]: ErrorRender;
};
declare const successCodeDefaults: SuccessCodeDefaults;
export { successCodeDefaults };
