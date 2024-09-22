import About from './About.vue';
import Home from './Home.vue';
import NewsPage from './NewsPage.vue';
import PageCouldNotLoaded from './PageCouldNotLoaded.vue';
import PageNotFound from './PageNotFound.vue';
import { RouterInstance } from '../router.js';
import Store from './Store.vue';

RouterInstance.getInstance().addRoute({
	component: Home,
	name: 'home',
	path: '/',
});

RouterInstance.getInstance().addRoute({
	component: NewsPage,
	name: 'news',
	path: '/aktuelles',
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
	component: PageCouldNotLoaded,
	path: '/could-not-load',
});

RouterInstance.getInstance().addRoute({
	component: PageNotFound,
	path: '/:pathMatch(.*)*',
});

