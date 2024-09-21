import './pages/pages.ts';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import { RouterInstance } from './router.ts';
import type { StateTree } from 'pinia';

/*
 * SSR requires a fresh app instance per request, therefore we export a function
 * that creates a fresh app instance. If using Vuex, we'd also be creating a
 * fresh store here.
 */
const createApp = function ({ store }: { store?: Record<string, StateTree> }) {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const router = RouterInstance.getInstance();
	app.use(router);

	router.beforeEach(() => {
		if (import.meta.env.SSR && store) pinia.state.value = store;

		/* eslint-disable no-underscore-dangle -- This custom property will be set somwhere else - No type error  */
		if (!import.meta.env.SSR && typeof window.__pinia === 'string') {
			const initialState = JSON.parse(window.__pinia);
			if (typeof initialState === 'object') {
				for (const key of Object.keys(initialState)) {
					if (typeof pinia.state.value[key] === 'undefined') {
						//
						pinia.state.value[key] = initialState[key];
					}
				}
			}
		}
		/* eslint-enable no-underscore-dangle -- End */
	});

	return { app, router };
};

export { createApp };
