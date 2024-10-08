import { defineStore } from 'pinia';
import { z as zod } from 'zod';

const GalleryResponseBodyValidator = zod.array(zod.object({
	createdAt: zod.string().datetime(),
	description: zod.string(),
	galleries: zod.array(zod.object({
		createdAt: zod.string().datetime(),
		description: zod.string(),
		identifier: zod.string().uuid(),
		images: zod.array(zod.object({
			createdAt: zod.string().datetime(),
			description: zod.string(),
			fileType: zod.string().nullable(),
			identifier: zod.string().uuid(),
			imageUrl: zod.string(),
			updatedAt: zod.string().datetime().nullable(),
		})),
		page: zod.object({
			technicalName: zod.string(),
		}).nullable(),
		title: zod.string(),
		updatedAt: zod.string().datetime().nullable(),
	})),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	title: zod.string(),
	updatedAt: zod.string().datetime().nullable(),
}));

type Category = zod.infer<typeof GalleryResponseBodyValidator>;

interface GalleryStoreState {
	categories: Category;
};

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const useGalleryStore = defineStore('gallery-store', {
	actions: {
		async fetchGalleryData(): Promise<void> {
			if (import.meta.env.SSR) return;

			const url = new URL('/api/store/gallery/by-category', baseUrl);
			const result = await fetch(url);
			const body = await result.json();

			if (!result.ok) {
				throw new Error('Could not fetch gallery', {
					cause: {
						response: JSON.stringify(body),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}

			const response = GalleryResponseBodyValidator.parse(body);
			this.$state.categories = response;
		},
		getGallery(category: string, technicalName: string): Category[0]['galleries'][0] | null {
			const galleriesFromCategory = this.categories.find((targetCategory) => targetCategory.technicalName === category);
			const gallery = galleriesFromCategory?.galleries.find((targetGallery) => targetGallery.page?.technicalName === technicalName);

			return gallery ?? null;
		},
	},
	state: (): GalleryStoreState => ({
		categories: [],
	}),
});

export { useGalleryStore };
export type { Category, GalleryStoreState };
