import { type GalleriesByCategory, getGalleriesGroupedByCategory } from '../../../services/gallery-service.js';
import { StoreInstance } from '../store-instance.js';
import type { StoreService } from '../../../services/StoreServiceInterface.js';

const galleryStoreHelper: StoreService = async () => {
	const galleriesByCategories = await getGalleriesGroupedByCategory();

	return {
		categories: galleriesByCategories,
	};
};

StoreInstance.getInstance().registerStoreOnRoute('/gallerie', 'gallery-store', galleryStoreHelper, {});

const updateRoutesForGallery = (galleriesByCategories: GalleriesByCategory): void => {
	for (const category of galleriesByCategories) {
		const categoryTechnicalName = category.technicalName;
		for (const gallery of category.galleries) {
			const galleryTechnicalName = gallery.page?.technicalName;
			if (typeof galleryTechnicalName !== 'string') continue;

			StoreInstance.getInstance().registerStoreOnRoute(
				`/gallerie/${categoryTechnicalName}/${galleryTechnicalName}`,
				'gallery-store',
				galleryStoreHelper,
				{},
			);
		}
	}
};

const createRoutesForGallery = async (): Promise<void> => {
	const galleriesByCategories = await getGalleriesGroupedByCategory();
	updateRoutesForGallery(galleriesByCategories);
};

void createRoutesForGallery();
