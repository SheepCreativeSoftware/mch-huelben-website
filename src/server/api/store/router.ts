import express from 'express';
import { getNewsHandle } from './news/handle.js';
import { getPagesHandle } from './pages/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.get('/store/news', getNewsHandle());
router.get('/store/pages', getPagesHandle());

export { router as newsRouter };
