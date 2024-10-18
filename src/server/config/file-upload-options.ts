/* eslint-disable no-magic-numbers -- This is a config file which intends to have numbers */
import type { Options } from 'express-fileupload';

const CONVERT_MB_TO_BYTES = 1024 * 1024;

const getFileUploadOptions = (): Options => {
	return {
		limits: {
			fileSize: 50 * CONVERT_MB_TO_BYTES,
		},
	};
};

export { getFileUploadOptions };
