import { NavLinks } from '../../interfaces/NavLinks.mjs';

// Todo: get Navlinks from DB
const naviLinks: NavLinks[] = [
	{
		active: false,
		href: 'start',
		name: 'Start',
	},
	{
		active: true,
		href: 'start',
		name: 'Start',
	},
];

const getNavLinks = () => {
	return naviLinks;
};

export { getNavLinks };
