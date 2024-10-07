import { getGalleriesGroupedByCategory } from '../../../services/gallery-service.js';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getGalleryGroupedByCategoryHandle = (): Handler => {
	return async (_req, res, next) => {
		try {
			const galleries = await getGalleriesGroupedByCategory();

			res.status(StatusCodes.OK).send(galleries);
		} catch (error) {
			next(error);
		};
	};
};

export { getGalleryGroupedByCategoryHandle };
