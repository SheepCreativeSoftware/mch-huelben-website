import { defineStore } from 'pinia';
import { ResponseNewsBodyValidator } from '../../server/api/store/news/response';
import type { z as zod } from 'zod';
type News = zod.infer<typeof ResponseNewsBodyValidator>;

export const useNewsStore = defineStore('news-store', {
	actions: {
		async fetchFoo(count?: number, offset?: number): Promise<void> {
			const url = new URL('api/store/get-latest-news');
			if (count) url.searchParams.append('count', String(count));
			if (offset) url.searchParams.append('offset', String(offset));

			const result = await fetch(url);
			const { news } = ResponseNewsBodyValidator.parse(await result.json());

			this.$state.news = news;
		},
		async getNews(count?: number, offset?: number): Promise<News['news']> {
			if (
				this.news.length === 0
				|| this.offset !== offset
				|| this.news.length < Number(count)
			) await this.fetchFoo(count, offset);

			return this.news.slice(0, count);
		},
	},
	state: (): News => ({
		news: [],
		offset: 0,
	}),
});
