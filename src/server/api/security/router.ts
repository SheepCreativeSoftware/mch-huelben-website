import express from 'express';
import { getLogoutUserHandle } from './logout-user/handle.js';
import { getRefreshTokenHandle } from './refresh-token/handle.js';
import { loginUserHandle } from './login-user/handle.js';
import { passwordResetHandle } from './password-reset/handle.js';
import { requestPasswordResetHandle } from './request-password-reset/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.post('/login-user', loginUserHandle());
router.post('/logout-user', getLogoutUserHandle());
router.post('/refresh-token', getRefreshTokenHandle());
router.post('/reset-password', passwordResetHandle());
router.post('/request-password-reset', requestPasswordResetHandle());

export { router as securityRouter };
