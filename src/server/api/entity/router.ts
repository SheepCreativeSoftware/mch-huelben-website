import { userAuthorizedHandler, userRoleAuthorizedHandler } from '../../modules/protection/user-auth-check.js';
import express from 'express';
import { getEventsHandle } from './events/handle.js';
import { getGalleryGroupedByCategoryHandle } from './gallery/handle.js';
import { getMetaHandle } from './meta/handle.js';
import { getNewsHandle } from './news/handle.js';
import { getPagesHandle } from './pages/handle.js';
import { getUpdateContentHandle } from './content/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.get('/events', getEventsHandle());
router.get('/meta', getMetaHandle());
router.get('/news', getNewsHandle());
router.get('/pages', getPagesHandle());
router.get('/gallery/by-category', getGalleryGroupedByCategoryHandle());

router.use(userAuthorizedHandler());
router.use(userRoleAuthorizedHandler());
router.post('/content/update', getUpdateContentHandle());

export { router as entityRouter };
