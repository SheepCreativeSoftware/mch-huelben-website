import About from './About.vue';
import Home from './Home.vue';
import PageNotFound from './PageNotFound.vue';
import { RouterInstance } from '../router.js';
import Store from './Store.vue';

RouterInstance.getInstance().addRoute({
	component: Home,
	path: '/',
});

RouterInstance.getInstance().addRoute({
	component: About,
	path: '/about',
});

RouterInstance.getInstance().addRoute({
	component: Store,
	path: '/store',
});

RouterInstance.getInstance().addRoute({
	component: PageNotFound,
	path: '/:pathMatch(.*)*',
});

