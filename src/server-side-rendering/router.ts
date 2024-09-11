import {
	createMemoryHistory,
	createRouter,
	createWebHistory,
} from 'vue-router';
import type { Router } from 'vue-router';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- ignore errors because it is needed for singleton pattern
class RouterInstance {
	static #instance: Router;
	static getInstance(): Router {
		if (typeof RouterInstance.#instance === 'undefined') {
			RouterInstance.#instance = createRouter({
				history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
				routes: [],
			});
		}

		return RouterInstance.#instance;
	}
}

export { RouterInstance };
