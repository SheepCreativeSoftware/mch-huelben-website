import { defineStore } from 'pinia';
import { stringToValidDateTransformer } from '../../modules/transform/validation-transformer';
import { z as zod } from 'zod';

const NewsResponseBodyValidator = zod.object({
	news: zod.array(zod.object({
		content: zod.string(),
		createdAt: zod.string().transform(stringToValidDateTransformer),
		identifier: zod.string().uuid(),
		title: zod.string(),
		updateAt: zod.string().nullish().transform((value, ctx): Date | null => {
			if (!value) return null;
			return stringToValidDateTransformer(value, ctx) as Date;
		}),
	})),
	offset: zod.number().min(0),
	totalCount: zod.number(),
});
type News = zod.infer<typeof NewsResponseBodyValidator>;

const baseUrl = import.meta.env.VITE_BASE_URL;

const useNewsStore = defineStore('news-store', {
	actions: {
		async fetchFoo(count?: number, offset?: number): Promise<void> {
			const url = new URL('/api/store/get-news', baseUrl);
			if (count) url.searchParams.append('count', String(count));
			if (offset) url.searchParams.append('offset', String(offset));

			const result = await fetch(url);

			if (!result.ok) throw new Error('Could not fetch news');
			const response = NewsResponseBodyValidator.parse(await result.json());

			this.$state.news = response.news;
			this.$state.offset = response.offset;
			this.$state.totalCount = response.totalCount;
		},
		async getNews(count?: number, offset?: number): Promise<News['news']> {
			if (
				this.news.length === 0
				// eslint-disable-next-line @stylistic/no-extra-parens -- This is not a mistake
				|| (typeof offset === 'number' && this.offset !== offset)
				|| this.news.length < Number(count)
			) await this.fetchFoo(count, offset);

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
