import { NavLinks } from './NavLinks.mjs';

interface RendererTemplate {
	CSRFToken?: string,
	author: string,
	meta: {
		description: string,
		keywords: string,
		title: string,
	},
	naviLinks: NavLinks[],
	message?: string,
	userLoggedIn?: boolean,
	adminLoggedIn?: boolean,
}

export { RendererTemplate };
