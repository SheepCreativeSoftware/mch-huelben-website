import {
	createRouter as _createRouter,
	createMemoryHistory,
	createWebHistory,
} from 'vue-router';

/*
 * Auto generates routes from vue files under ./pages
 * https://vitejs.dev/guide/features.html#glob-import
 */
const pages = import.meta.glob('./pages/*.vue');

const routes = Object.keys(pages).map((path) => {
	const name = /\.\/pages(.*)\.vue$/.exec(path)[1].toLowerCase();
	return {
		path: name === '/home' ? '/' : name,
		component: pages[path], // () => import('./pages/*.vue')
	};
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
