import { defaultNavLinks } from '../defaults/defaultNavLinks.mjs';
const naviLinks = [];
// eslint-disable-next-line default-param-last
const getNavLinks = (role = 'none', path) => {
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
            links.unshift(...defaultNavLinks);
            break;
        default:
            break;
    }
    links.forEach((value) => {
        if (value.href === path)
            value.active = true;
        else
            value.active = false;
    });
    return links;
};
export { getNavLinks };
