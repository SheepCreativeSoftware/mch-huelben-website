import { defineStore } from 'pinia';
import { useAccessStore } from './access-store';
import { z as zod } from 'zod';

const NewsResponseBodyValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().datetime(),
		identifier: zod.string().uuid(),
		isActive: zod.boolean(),
		title: zod.string(),
		updatedAt: zod.string().datetime().nullish(),
	})),
	offset: zod.number().min(0),
	totalCount: zod.number(),
});
type News = zod.infer<typeof NewsResponseBodyValidator>;

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const useNewsStore = defineStore('news-store', {
	actions: {
		async fetchNewsData(count?: number, offset?: number, includeDisabled?: boolean): Promise<void> {
			if (import.meta.env.SSR) return;

			const url = new URL('/api/entity/news', baseUrl);
			if (count) url.searchParams.append('count', String(count));
			if (offset) url.searchParams.append('offset', String(offset));
			if (includeDisabled) url.searchParams.append('includeDisabled', String(includeDisabled));

			const result = await fetch(url);
			const body = await result.json();

			if (!result.ok) {
				throw new Error('Could not fetch news', {
					cause: {
						response: JSON.stringify(body),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}
			const response = NewsResponseBodyValidator.parse(body);

			this.$state.news = response.news;
			this.$state.offset = response.offset;
			this.$state.totalCount = response.totalCount;
		},
		getNews(count?: number): News['news'] {
			return this.news.slice(0, count);
		},

		async updateNewsArticle({ content, identifier, title }: { content?: string, identifier: string, title?: string }): Promise<void> {
			const accessStore = useAccessStore();
			const url = new URL('/api/entity/news/update', baseUrl);

			const body = {
				content,
				identifier,
				title,
			};

			const result = await fetch(url, {
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${accessStore.token}`,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			if (!result.ok) {
				throw new Error('Could not update news article', {
					cause: {
						response: JSON.stringify(result),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}
		},

		async updateNewsArticleActiveState({ identifier, isActive }: { identifier: string, isActive: boolean }): Promise<void> {
			const accessStore = useAccessStore();
			const url = new URL('/api/entity/news/update-active-state', baseUrl);

			const body = {
				identifier,
				isActive,
			};

			const result = await fetch(url, {
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${accessStore.token}`,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			if (!result.ok) {
				throw new Error('Could not update news article active state', {
					cause: {
						response: JSON.stringify(result),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}
		},
	},
	state: (): News => ({
		news: [],
		offset: 0,
		totalCount: 0,
	}),
});

export { useNewsStore };
export type { News };
