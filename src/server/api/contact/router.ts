import express from 'express';
import { getContactMessageHandle } from './message/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.post('/message', getContactMessageHandle());

export { router as contactRouter };
