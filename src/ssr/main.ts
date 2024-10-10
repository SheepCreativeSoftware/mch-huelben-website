import './pages/pages.ts';
import type { Pinia, StateTree } from 'pinia';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import type { NavigationGuardWithThis } from 'vue-router';
import { RouterInstance } from './router.ts';
import { useAccessStore } from './stores/access-store.ts';

const loadInitialStoreOnRoute = (pinia: Pinia): NavigationGuardWithThis<undefined> => {
	return () => {
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
	};
};

const checkAuthRoleOnRoute = (pinia: Pinia): NavigationGuardWithThis<undefined> => {
	return (routeTo) => {
		if (!import.meta.env.SSR) {
			if (routeTo.meta.requiresAuthRole && routeTo.name !== 'login') {
				const accessStore = useAccessStore(pinia);

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Could be nullish
				if (routeTo.meta.requiresAuthRole?.length >= 1 && !accessStore.isLoggedIn) return { name: 'login' };
				// @ts-expect-error -- This intentionally checks if role is set
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Could be nullish
				if (!routeTo.meta.requiresAuthRole?.includes(accessStore.role)) return { name: 'forbidden' };
			}
		}
		return true;
	};
};

/*
 * SSR requires a fresh app instance per request, therefore we export a function
 * that creates a fresh app instance. If using Vuex, we'd also be creating a
 * fresh store here.
 */
const createApp = function ({ store }: { store?: Record<string, StateTree>, user?: Express.User }) {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const router = RouterInstance.getInstance();
	app.use(router);

	if (import.meta.env.SSR && store) pinia.state.value = store;

	router.beforeEach(loadInitialStoreOnRoute(pinia));
	router.beforeEach(checkAuthRoleOnRoute(pinia));

	return { app, router };
};

export { createApp };
