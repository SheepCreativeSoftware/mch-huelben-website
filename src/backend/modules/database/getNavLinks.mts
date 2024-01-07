import { NavLinks } from '../../interfaces/NavLinks.mjs';

type UserRoles = 'none' | 'user' | 'admin';

// Todo: get Navlinks from DB
const naviLinks: NavLinks[] = [];

const getNavLinks = (role: UserRoles='none', path?: string) => {
	const links = [...naviLinks];
	switch (role) {
	case 'admin':
		links.push({
			active: false,
			href: '/management/user',
			name: 'Benutzer-Verwaltung',
		});
	// eslint-disable-next-line no-fallthrough
	case 'user':
		links.push({
			active: false,
			href: '/management/pages',
			name: 'Seiten-Verwaltung',
		});
	// eslint-disable-next-line no-fallthrough
	case 'none':
		links.unshift({
			active: false,
			href: '/',
			name: 'Start',
		});
		break;
	default:
		break;
	}
	links.forEach((value) => {
		if(value.href === path) value.active = true;
		else value.active = false;
	});
	return links;
};

export { getNavLinks };
