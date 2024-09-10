import type {
	RouterOptions,
} from 'vue-router';
import {
	createRouter as _createRouter,
	createMemoryHistory,
	createWebHistory,
} from 'vue-router';
import PageNotFound from './pages/PageNotFound.vue';

/*
 * Auto generates routes from vue files under ./pages
 * https://vitejs.dev/guide/features.html#glob-import
 */
const pages = import.meta.glob('./pages/**/*.vue');

const routes: RouterOptions['routes'] = Object.keys(pages).map((path) => {
	const name = /\.\/pages(.*)\.vue$/.exec(path)[1].toLowerCase();

	return {
		component: pages[path], // () => import('./pages/*.vue')
		path: name === '/home' ? '/' : name,
	};
});

routes.push({
	component: PageNotFound,
	path: '/:pathMatch(.*)*',
});

const createRouter = function () {
	return _createRouter({
		/*
		 * Use appropriate history implementation for server/client
		 * Import.meta.env.SSR is injected by Vite.
		 */
		history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
		routes,

	});
};

export { createRouter };
