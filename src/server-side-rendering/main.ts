import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter } from './router.ts';
import { createSSRApp } from 'vue';

/*
 * SSR requires a fresh app instance per request, therefore we export a function
 * that creates a fresh app instance. If using Vuex, we'd also be creating a
 * fresh store here.
 */
const createApp = function (store) {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const router = createRouter();
	app.use(router);
	/*
	 * Pinia.state.value['foo-store'] = { count: 0, foo: 'foobar' };
	 *  Onsole.dir(pinia.state.value, { depth: 3, showHidden: true });
	 */

	router.beforeEach((to) => {
		if (import.meta.env.SSR && store) {
			pinia.state.value = store;
			console.log('pinia.state.value', pinia.state.value);
		}
		if (!import.meta.env.SSR && to.path === '/store') {
			const store = JSON.parse(window.__pinia);
			if (store) pinia.state.value = store;
			console.log('pinia.state.value', window.__pinia);
		}
	});

	return { app, router };
};

export { createApp };
