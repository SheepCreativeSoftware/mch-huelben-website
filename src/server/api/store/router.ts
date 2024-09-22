import express from 'express';
import { getNewsHandle } from './news/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.get('/store/get-news', getNewsHandle());

export { router as newsRouter };
