/* eslint-disable no-undefined -- It needs to be used to remove the original query param */
import { RouterInstance } from '../router.js';

RouterInstance.getInstance().addRoute({
	path: '/index.php',

	redirect(route) {
		switch (route.query.site) {
			case 'news':
				return { name: 'news', query: undefined };
			case 'gallery':
				return { name: 'gallery-overview', query: undefined };
			case 'about':
				return { name: 'about', query: undefined };
			case 'club':
				return { name: 'about', query: undefined };
			case 'pics':
				switch (route.query.subpics) {
					default:
						return { name: 'gallerie', query: undefined };
				}

			case 'kontakt':
				return { hash: '#kontakt', name: 'home', query: undefined };
			case 'impressum':
				return { name: 'imprint', query: undefined };
			default:
				return { name: 'home', query: undefined };
		}
	},

});
