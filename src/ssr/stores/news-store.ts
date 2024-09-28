import { defineStore } from 'pinia';
import { z as zod } from 'zod';

const NewsResponseBodyValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().datetime(),
		identifier: zod.string().uuid(),
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
		async fetchNewsData(count?: number, offset?: number): Promise<void> {
			if (import.meta.env.SSR) return;

			if (this.news.length >= Number(count)
				&& this.offset === offset
			) return;

			const url = new URL('/api/store/news', baseUrl);
			if (count) url.searchParams.append('count', String(count));
			if (offset) url.searchParams.append('offset', String(offset));

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
	},
	state: (): News => ({
		news: [],
		offset: 0,
		totalCount: 0,
	}),
});

export { useNewsStore };
export type { News };
