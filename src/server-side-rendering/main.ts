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
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- typescript does not recognize the right typing on that vue file
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const router = RouterInstance.getInstance();
	app.use(router);

	router.beforeEach(() => {
		if (import.meta.env.SSR && store) pinia.state.value = store;

		/* eslint-disable @typescript-eslint/no-unsafe-argument, no-underscore-dangle -- This custom property will be set somwhere else - No type error  */
		if (!import.meta.env.SSR && typeof window.__pinia === 'string') {
			const initialState = JSON.parse(window.__pinia);
			if (initialState) pinia.state.value = initialState;
		}
		/* eslint-enable @typescript-eslint/no-unsafe-argument, no-underscore-dangle -- End */
	});

	return { app, router };
};

export { createApp };
