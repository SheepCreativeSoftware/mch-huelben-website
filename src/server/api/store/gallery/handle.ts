import { getGalleriesGroupedByCategory } from '../../../services/gallery-service.js';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getGalleryGroupedByCategoryHandle = (): Handler => {
	return async (_req, res, next) => {
		try {
			const galleriesByCategories = await getGalleriesGroupedByCategory();

			res.status(StatusCodes.OK).send(galleriesByCategories);
		} catch (error) {
			next(error);
		};
	};
};

export { getGalleryGroupedByCategoryHandle };
