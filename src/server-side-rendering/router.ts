import {
	createMemoryHistory,
	createRouter,
	createWebHistory,
} from 'vue-router';
import type { Router } from 'vue-router';

const scrollDelay = 500;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- ignore errors because it is needed for singleton pattern
class RouterInstance {
	static #instance: Router;
	static getInstance(): Router {
		if (typeof RouterInstance.#instance === 'undefined') {
			RouterInstance.#instance = createRouter({
				history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
				routes: [],
				// eslint-disable-next-line id-length -- this is a vue-router property
				scrollBehavior(to, _from, savedPosition) {
					if (to.hash) {
						return new Promise((resolve) => {
							setTimeout(() => {
								resolve({
									behavior: 'smooth',
									// eslint-disable-next-line id-length -- this is a vue-router property
									el: to.hash,
									top: 96,
								});
							}, scrollDelay);
						});
					}

					if (savedPosition) return savedPosition;

					return { left: 0, top: 0 };
				},
			});
		}

		return RouterInstance.#instance;
	}
}

export { RouterInstance };
