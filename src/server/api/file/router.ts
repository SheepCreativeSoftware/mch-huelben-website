import express from 'express';
import fileUpload from 'express-fileupload';
import { getFileUploadHandle } from './upload/handle.js';
import { getFileUploadOptions } from '../../config/file-upload-options.js';
import { userAuthorizedHandler } from '../../modules/protection/user-auth-check.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.post('/upload', userAuthorizedHandler(), fileUpload(getFileUploadOptions()), getFileUploadHandle());

export { router as fileRouter };
