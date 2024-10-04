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
const createApp = function ({ store, user }: { store?: Record<string, StateTree>, user?: Express.User }) {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const router = RouterInstance.getInstance();
	app.use(router);

	if (import.meta.env.SSR && store) pinia.state.value = store;

	router.beforeEach(() => {
		if (!import.meta.env.SSR) {
			const initialState = JSON.parse(document.querySelector('#pinia')?.innerHTML ?? '{}');
			if (typeof initialState === 'object') {
				for (const key of Object.keys(initialState)) {
					if (typeof pinia.state.value[key] === 'undefined') {
						//
						pinia.state.value[key] = initialState[key];
					}
				}
			}
		}
	});

	router.beforeEach((routeTo) => {
		if (routeTo.meta.requiresAuthRole && routeTo.name !== 'login') {
			// Check if the user is logged in
			if (!user || !routeTo.meta.requiresAuthRole.includes(user.role)) return { name: 'login' };
		}
		return true;
	});

	return { app, router };
};

export { createApp };
