import { defineStore } from 'pinia';
import { useAccessStore } from './access-store';
import { z as zod } from 'zod';

const PagesResponseBodyValidator = zod.object({
	contents: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().datetime(),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updatedAt: zod.string().datetime().nullish(),
	})),
	createdAt: zod.string().datetime(),
	identifier: zod.string().uuid(),
	technicalName: zod.string(),
	updatedAt: zod.string().datetime().nullish(),
});

type Pages = zod.infer<typeof PagesResponseBodyValidator>;
type PageStoreState = Record<Pages['technicalName'], Pages['contents']>;

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const usePagesStore = defineStore('pages-store', {
	actions: {
		async fetchPageData(technicalName: string): Promise<void> {
			const url = new URL('/api/entity/pages', baseUrl);
			url.searchParams.append('technicalName', technicalName);
			const response = await fetch(url);
			const body = await response.json();

			if (!response.ok) {
				throw new Error('Could not fetch page', {
					cause: {
						response: JSON.stringify(body),
						status: response.status,
						statusText: response.statusText,
					},
				});
			}

			const validatedBody = PagesResponseBodyValidator.parse(body);
			this.$state[technicalName] = validatedBody.contents;
		},
		getPage(technicalName: string): Pages['contents'] {
			if (typeof this.$state[technicalName] === 'undefined') return [];
			return this.$state[technicalName];
		},
		async updatePagesContent({ identifier, content, title }: { identifier: string; content?: string, title?: string }): Promise<void> {
			const accessStore = useAccessStore();
			const url = new URL('/api/entity/content/update', baseUrl);

			const body = {
				content,
				identifier,
				title,
			};

			const result = await fetch(url, {
				body: JSON.stringify(body),
				headers: {
					'Authorization': `Bearer ${accessStore.token}`,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			if (!result.ok) {
				throw new Error('Could not update page content', {
					cause: {
						response: JSON.stringify(result),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}
		},
	},
	state: (): PageStoreState => ({}),
});

export { usePagesStore };
export type { Pages };
