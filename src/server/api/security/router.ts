import express from 'express';
import { loginUserHandle } from './login-user/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.post('/login-user', loginUserHandle());

export { router as securityRoutes };
