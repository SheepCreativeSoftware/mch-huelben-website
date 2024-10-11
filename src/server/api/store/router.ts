import { getEditPagesContentHandle, getPagesHandle } from './pages/handle.js';
import { userAuthorizedHandler, userRoleAuthorizedHandler } from '../../modules/protection/user-auth-check.js';
import express from 'express';
import { getEventsHandle } from './events/handle.js';
import { getGalleryGroupedByCategoryHandle } from './gallery/handle.js';
import { getMetaHandle } from './meta/handle.js';
import { getNewsHandle } from './news/handle.js';

// eslint-disable-next-line new-cap -- This is not a constructor
const router = express.Router();

router.get('/store/events', getEventsHandle());
router.get('/store/meta', getMetaHandle());
router.get('/store/news', getNewsHandle());
router.get('/store/pages', getPagesHandle());
router.get('/store/gallery/by-category', getGalleryGroupedByCategoryHandle());

router.post('/store/pages/edit-content', userAuthorizedHandler(), userRoleAuthorizedHandler(), getEditPagesContentHandle());

export { router as newsRouter };
