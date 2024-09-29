import { defineStore } from 'pinia';
import { z as zod } from 'zod';

const EventsResponseBodyValidator = zod.array(zod.object({
	createdAt: zod.string().datetime(),
	fromDate: zod.string().datetime(),
	identifier: zod.string().uuid(),
	isActive: zod.boolean(),
	title: zod.string(),
	toDate: zod.string().datetime().nullish(),
	updatedAt: zod.string().datetime().nullish(),
}));

type Events = zod.infer<typeof EventsResponseBodyValidator>;
interface EventsStoreState {
	events: Events
};

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const useEventsStore = defineStore('events-store', {
	actions: {
		async fetchEventsData(): Promise<void> {
			if (import.meta.env.SSR) return;

			const url = new URL('/api/store/events', baseUrl);
			const result = await fetch(url);
			const body = await result.json();

			if (!result.ok) {
				throw new Error('Could not fetch events', {
					cause: {
						response: JSON.stringify(body),
						status: result.status,
						statusText: result.statusText,
					},
				});
			}

			const response = EventsResponseBodyValidator.parse(body);
			this.$state.events = response;
		},
		getEvents(): Events {
			return this.events;
		},
	},
	state: (): EventsStoreState => ({
		events: [],
	}),
});

export { useEventsStore };
