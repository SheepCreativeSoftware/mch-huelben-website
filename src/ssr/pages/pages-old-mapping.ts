/* eslint-disable no-undefined -- It needs to be used to remove the original query param */
import { RouterInstance } from '../router.js';

RouterInstance.getInstance().addRoute({
	path: '/index.php',

	// eslint-disable-next-line complexity -- This is a mapping
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
				return { name: 'gallery-overview', query: undefined };
			case 'subpics':
				switch (route.query.subsite) {
					case 'noerdlingen2005':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'noerdlingen2005' }, query: undefined };
					case 'schweiz2008':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'schweiz2008' }, query: undefined };
					case 'neuffen2008':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'neuffen2008' }, query: undefined };
					case 'heilbronn2009':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'heilbronn2009' }, query: undefined };
					case 'schweiz2010':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'schweiz2010' }, query: undefined };
					case 'oechsle2013':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'oechsle2013' }, query: undefined };
					case 'ulm2014':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'ulm2014' }, query: undefined };
					case 'harz2015':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'harz2015' }, query: undefined };
					case 'zacke2015':
						return { name: 'gallery-detail', params: { category: 'ausflug', technicalName: 'zacke2015' }, query: undefined };
					case 'austellung2005':
						return { name: 'gallery-detail', params: { category: 'ausstellungen', technicalName: 'ausstellung2005' }, query: undefined };
					case 'austellung2006':
						return { name: 'gallery-detail', params: { category: 'ausstellungen', technicalName: 'ausstellung2006' }, query: undefined };
					case 'austellung2011':
						return { name: 'gallery-detail', params: { category: 'ausstellungen', technicalName: 'ausstellung2011' }, query: undefined };
					case 'austellung2014':
						return { name: 'gallery-detail', params: { category: 'ausstellungen', technicalName: 'ausstellung2014' }, query: undefined };
					case 'austellungBoehringen2017':
						return { name: 'gallery-detail', params: { category: 'ausstellungen', technicalName: 'ausstellung2017' }, query: undefined };
					case 'langenthal':
						return { name: 'gallery-detail', params: { category: 'anlagen', technicalName: 'anbau-langenthal' }, query: undefined };
					case 'schwarzwaldbahn':
						return { name: 'gallery-detail', params: { category: 'anlagen', technicalName: 'schwarzwaldbahn' }, query: undefined };
					default:
						return { name: 'gallery-overview', query: undefined };
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
