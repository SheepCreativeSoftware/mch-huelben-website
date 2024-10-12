import { defineStore } from 'pinia';
import { z as zod } from 'zod';

const MetaResponseBodyValidator = zod.object({
	createdAt: zod.string().datetime(),
	description: zod.string(),
	identifier: zod.string().uuid(),
	image: zod.string().url().nullish(),
	title: zod.string(),
	type: zod.string().nullish(),
	updatedAt: zod.string().datetime().nullish(),
});

type Meta = zod.infer<typeof MetaResponseBodyValidator>;
type MetaStoreState = Record<string, Meta>;

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const useMetaStore = defineStore('meta-store', {
	actions: {
		async fetchMetaData(technicalName: string): Promise<void> {
			if (typeof this.$state[technicalName] !== 'undefined') return;

			const url = new URL('/api/entity/meta', baseUrl);
			url.searchParams.append('technicalName', technicalName);
			const response = await fetch(url);
			const body = await response.json();

			if (!response.ok) {
				throw new Error('Could not fetch meta', {
					cause: {
						response: JSON.stringify(body),
						status: response.status,
						statusText: response.statusText,
					},
				});
			}

			const validatedBody = MetaResponseBodyValidator.parse(body);
			this.$state[technicalName] = validatedBody;
		},
		getMetaData(technicalName: string): Meta | null {
			if (typeof this.$state[technicalName] === 'undefined') return null;
			return this.$state[technicalName];
		},

	},
	state: (): MetaStoreState => ({}),
});

export { useMetaStore };
