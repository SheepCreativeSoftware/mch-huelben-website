import About from './About.vue';
import Gallery from './Gallery.vue';
import Home from './Home.vue';
import Imprint from './Imprint.vue';
import NewsPage from './NewsPage.vue';
import PageCouldNotLoaded from './PageCouldNotLoaded.vue';
import PageNotFound from './PageNotFound.vue';
import PrivacyPolicy from './PrivacyPolicy.vue';
import { RouterInstance } from '../router.js';

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
	name: 'about',
	path: '/ueber',
});

RouterInstance.getInstance().addRoute({
	component: Gallery,
	name: 'gallerie',
	path: '/gallerie',
});

RouterInstance.getInstance().addRoute({
	component: Imprint,
	name: 'impressum',
	path: '/impressum',
});

RouterInstance.getInstance().addRoute({
	component: PrivacyPolicy,
	name: 'datenschutz',
	path: '/datenschutz',
});

RouterInstance.getInstance().addRoute({
	component: PageCouldNotLoaded,
	name: 'could-not-load',
	path: '/could-not-load',
});

RouterInstance.getInstance().addRoute({
	component: PageNotFound,
	name: 'not-found',
	path: '/:pathMatch(.*)*',
});

