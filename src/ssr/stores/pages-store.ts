import { defineStore } from 'pinia';
import { z as zod } from 'zod';

const PagesResponseBodyValidator = zod.object({
	contents: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().datetime(),
		identifier: zod.string().uuid(),
		updatedAt: zod.string().datetime(),
	})),
	createdAt: zod.string().datetime(),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	updatedAt: zod.string().datetime(),
});

type Pages = zod.infer<typeof PagesResponseBodyValidator>;
type PageStoreState = Record<Pages['technicalName'], Pages['contents']>;

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const usePagesStore = defineStore('news-store', {
	actions: {
		async fetchPageData(technicalName: string): Promise<void> {
			const url = new URL('/api/store/news', baseUrl);
			url.searchParams.append('technicalName', technicalName);
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Could not fetch page', {
					cause: {
						status: response.status,
						statusText: response.statusText,
					},
				});
			}

			const body = await response.json();
			const validatedBody = PagesResponseBodyValidator.parse(body);
			this.$state[technicalName] = validatedBody.contents;
		},
		getPage(technicalName: string): Pages['contents'] {
			return this.$state[technicalName];
		},
	},
	state: (): PageStoreState => ({}),
});

export { usePagesStore };
export type { Pages };